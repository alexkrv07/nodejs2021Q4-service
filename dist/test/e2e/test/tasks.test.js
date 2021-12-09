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
const { request: unauthorizedRequest, routes } = require('../lib');
const debug = require('debug')('rs:test:tasks');
const { createAuthorizedRequest, shouldAuthorizationBeTested } = require('../utils');
const TEST_TASK_DATA = {
    title: 'Autotest task',
    order: 0,
    description: 'Lorem ipsum',
    userId: null,
    boardId: null,
    columnId: null
};
const TEST_BOARD_DATA = {
    title: 'Autotest board',
    columns: [
        { title: 'Backlog', order: 1 },
        { title: 'Sprint', order: 2 }
    ]
};
describe('Tasks suite', () => {
    let request = unauthorizedRequest;
    let testTaskId;
    let testBoardId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (shouldAuthorizationBeTested) {
            request = yield createAuthorizedRequest(unauthorizedRequest);
        }
        yield request
            .post(routes.boards.create)
            .set('Accept', 'application/json')
            .send(TEST_BOARD_DATA)
            .then(res => (testBoardId = res.body.id));
        yield request
            .post(routes.tasks.create(testBoardId))
            .set('Accept', 'application/json')
            .send(TEST_TASK_DATA)
            .then(res => (testTaskId = res.body.id));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(routes.boards.delete(testBoardId))
            .then(res => expect(res.status).oneOf([200, 204]));
    }));
    describe('GET', () => {
        it('should get all tasks', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get(routes.tasks.getAll(testBoardId))
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                debug(res.body);
                expect(res.body).to.be.an('array');
                jestExpect(res.body).not.toHaveLength(0);
            });
        }));
        it('should get a task by id', () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup
            let expectedTask;
            yield request
                .get(routes.tasks.getAll(testBoardId))
                .expect(200)
                .then(res => {
                jestExpect(Array.isArray(res.body)).toBe(true);
                jestExpect(res.body).not.toHaveLength(0);
                expectedTask = res.body[0];
            });
            // Test
            yield request
                .get(routes.tasks.getById(expectedTask.boardId, expectedTask.id))
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                jestExpect(res.body).toEqual(expectedTask);
            });
        }));
    });
    describe('POST', () => {
        it('should create task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            let taskId;
            yield request
                .post(routes.tasks.create(testBoardId))
                .set('Accept', 'application/json')
                .send(TEST_TASK_DATA)
                .expect(201)
                .expect('Content-Type', /json/)
                .then(res => {
                expect(res.body.id).to.be.a('string');
                taskId = res.body.id;
                jestExpect(res.body).toMatchObject(Object.assign(Object.assign({}, TEST_TASK_DATA), { boardId: testBoardId }));
            });
            // Teardown
            yield request.delete(routes.tasks.delete(testBoardId, taskId));
        }));
    });
    describe('PUT', () => {
        it('should update task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup
            let addedTask;
            yield request
                .post(routes.tasks.create(testBoardId))
                .set('Accept', 'application/json')
                .send(TEST_TASK_DATA)
                .then(res => {
                addedTask = res.body;
            });
            const updatedTask = Object.assign(Object.assign({}, addedTask), { title: 'Autotest updated task' });
            // Test
            yield request
                .put(routes.tasks.update(updatedTask.boardId, updatedTask.id))
                .set('Accept', 'application/json')
                .send(updatedTask)
                .expect(200)
                .expect('Content-Type', /json/);
            yield request
                .get(routes.tasks.getById(updatedTask.boardId, updatedTask.id))
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => jestExpect(res.body).toMatchObject(updatedTask));
        }));
    });
    describe('DELETE', () => {
        it('should delete task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get(routes.tasks.getById(testBoardId, testTaskId))
                .expect(200);
            yield request
                .delete(routes.tasks.delete(testBoardId, testTaskId))
                .then(res => expect(res.status).oneOf([200, 204]));
            yield request
                .get(routes.tasks.getById(testBoardId, testTaskId))
                .expect(404);
        }));
    });
});
//# sourceMappingURL=tasks.test.js.map