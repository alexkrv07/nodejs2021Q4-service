"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const { request: unauthorizedRequest, routes } = require('../lib');
const debug = require('debug')('rs:test:users');
const { createAuthorizedRequest, shouldAuthorizationBeTested } = require('../utils');
const TEST_USER_DATA = {
    name: 'TEST_USER',
    login: 'test_user',
    password: 'T35t_P@55w0rd'
};
const TEST_BOARD_DATA = {
    title: 'Autotest board',
    columns: [
        { title: 'Backlog', order: 1 },
        { title: 'Sprint', order: 2 }
    ]
};
describe('Users suite', () => {
    let request = unauthorizedRequest;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (shouldAuthorizationBeTested) {
            request = yield createAuthorizedRequest(unauthorizedRequest);
        }
    }));
    describe('GET', () => {
        it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const usersResponse = yield request
                .get(routes.users.getAll)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);
            debug(usersResponse.body);
            expect(usersResponse.status).to.equal(200);
            expect(Array.isArray(usersResponse.body)).to.be.true();
        }));
        it('should get a user by id', () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup:
            let userId;
            // Create the user
            yield request
                .post(routes.users.create)
                .set('Accept', 'application/json')
                .send(TEST_USER_DATA)
                .expect(201)
                .expect('Content-Type', /json/)
                .then(res => {
                expect(res.body.id).to.be.a('string');
                userId = res.body.id;
            });
            // Test:
            const userResponse = yield request
                .get(routes.users.getById(userId))
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);
            expect(userResponse.body).to.be.instanceOf(Object);
            expect(userResponse.body.id).to.equal(userId);
            // Clean up, delete the user we created
            yield request.delete(routes.users.delete(userId));
        }));
    });
    describe('POST', () => {
        it('should create user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            let userId;
            yield request
                .post(routes.users.create)
                .set('Accept', 'application/json')
                .send(TEST_USER_DATA)
                .expect(201)
                .expect('Content-Type', /json/)
                .then(res => {
                expect(res.body.id).to.be.a('string');
                userId = res.body.id;
                expect(res.body).to.not.have.property('password');
                jestExpect(res.body).toMatchObject({
                    login: TEST_USER_DATA.login,
                    name: TEST_USER_DATA.name
                });
            });
            // Teardown
            yield request.delete(routes.users.delete(userId));
        }));
    });
    describe('PUT', () => {
        it('should update user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup
            let userId;
            yield request
                .post(routes.users.create)
                .set('Accept', 'application/json')
                .send(TEST_USER_DATA)
                .then(res => {
                userId = res.body.id;
            });
            const updatedUser = Object.assign(Object.assign({}, TEST_USER_DATA), { name: 'Autotest updated TEST_USER', id: userId });
            // Test
            yield request
                .put(routes.users.update(userId))
                .set('Accept', 'application/json')
                .send(updatedUser)
                .expect(200)
                .expect('Content-Type', /json/);
            // eslint-disable-next-line no-unused-vars
            const { password } = updatedUser, expectedUser = __rest(updatedUser, ["password"]);
            yield request
                .get(routes.users.getById(userId))
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => jestExpect(res.body).toMatchObject(expectedUser));
            // Teardown
            yield request.delete(routes.users.delete(userId));
        }));
    });
    describe('DELETE', () => {
        it('should delete user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup:
            const userResponse = yield request
                .post(routes.users.create)
                .send(TEST_USER_DATA);
            const userId = userResponse.body.id;
            // Test:
            const deleteResponse = yield request.delete(routes.users.delete(userId));
            expect(deleteResponse.status).oneOf([200, 204]);
        }));
        it("should unassign user's tasks upon deletion", () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup:
            const userResponse = yield request
                .post(routes.users.create)
                .send(TEST_USER_DATA)
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/);
            const userId = userResponse.body.id;
            const boardResponse = yield request
                .post(routes.boards.create)
                .send(TEST_BOARD_DATA)
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/);
            const boardId = boardResponse.body.id;
            const userTaskResponses = yield Promise.all(Array.from(Array(2)).map((_, idx) => request
                .post(routes.tasks.create(boardId))
                .send({
                title: `Task #${idx + 1}`,
                order: idx + 1,
                description: 'Lorem ipsum',
                userId,
                boardId
            })
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/)));
            const userTaskIds = userTaskResponses.map(res => res.body.id);
            // Test:
            const deleteResponse = yield request.delete(routes.users.delete(userId));
            expect(deleteResponse.status).oneOf([200, 204]);
            for (const taskId of userTaskIds) {
                const newTaskResponse = yield request
                    .get(routes.tasks.getById(boardId, taskId))
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/);
                expect(newTaskResponse.body).to.be.instanceOf(Object);
                expect(newTaskResponse.body.userId).to.equal(null);
            }
            yield Promise.all(userTaskIds.map((taskId) => __awaiter(void 0, void 0, void 0, function* () {
                return request
                    .delete(routes.tasks.getById(boardId, taskId))
                    .then(response => expect(response.status).oneOf([200, 204]));
            })));
            yield request
                .delete(routes.boards.delete(boardId))
                .then(res => expect(res.status).oneOf([200, 204]));
        }));
    });
});
//# sourceMappingURL=users.test.js.map