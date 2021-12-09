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
const debug = require('debug')('rs:test:boards');
const { createAuthorizedRequest, shouldAuthorizationBeTested } = require('../utils');
const TEST_BOARD_DATA = {
    title: 'Autotest board',
    columns: [
        { title: 'Backlog', order: 1 },
        { title: 'Sprint', order: 2 }
    ]
};
describe('Boards suite', () => {
    let request = unauthorizedRequest;
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
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(routes.boards.delete(testBoardId))
            .then(res => expect(res.status).oneOf([200, 204]));
    }));
    describe('GET', () => {
        it('should get all boards', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get(routes.boards.getAll)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                debug(res.body);
                expect(res.body).to.be.an('array');
                jestExpect(res.body).not.toHaveLength(0);
            });
        }));
        it('should get a board by id', () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup
            let expectedBoard;
            yield request
                .get(routes.boards.getAll)
                .expect(200)
                .then(res => {
                jestExpect(Array.isArray(res.body)).toBe(true);
                jestExpect(res.body).not.toHaveLength(0);
                jestExpect(res.body.find(e => e.id === testBoardId)).not.toBe(undefined);
                expectedBoard = res.body.find(e => e.id === testBoardId);
            });
            // Test
            yield request
                .get(routes.boards.getById(testBoardId))
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                jestExpect(res.body).toEqual(expectedBoard);
            });
        }));
    });
    describe('POST', () => {
        it('should create board successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            let boardId;
            yield request
                .post(routes.boards.create)
                .set('Accept', 'application/json')
                .send(TEST_BOARD_DATA)
                .expect(201)
                .expect('Content-Type', /json/)
                .then(res => {
                boardId = res.body.id;
                expect(res.body.id).to.be.a('string');
                jestExpect(res.body).toMatchObject(TEST_BOARD_DATA);
            });
            // Teardown
            yield request.delete(routes.boards.delete(boardId));
        }));
    });
    describe('PUT', () => {
        it('should update board successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup
            let boardToUpdate;
            yield request
                .post(routes.boards.create)
                .set('Accept', 'application/json')
                .send(TEST_BOARD_DATA)
                .then(res => {
                boardToUpdate = res.body;
            });
            const updatedBoard = Object.assign(Object.assign({}, boardToUpdate), { title: 'Autotest updated board' });
            // Test
            yield request
                .put(routes.boards.update(boardToUpdate.id))
                .set('Accept', 'application/json')
                .send(updatedBoard)
                .expect(200)
                .expect('Content-Type', /json/);
            yield request
                .get(routes.boards.getById(updatedBoard.id))
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => jestExpect(res.body).toMatchObject(updatedBoard));
            // Teardown
            yield request.delete(routes.boards.delete(updatedBoard.id));
        }));
    });
    describe('DELETE', () => {
        it('should delete board successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup:
            let boardId;
            yield request
                .post(routes.boards.create)
                .set('Accept', 'application/json')
                .send(TEST_BOARD_DATA)
                .expect(201)
                .expect('Content-Type', /json/)
                .then(res => (boardId = res.body.id));
            // Test
            yield request
                .delete(routes.boards.delete(boardId))
                .then(res => expect(res.status).oneOf([200, 204]));
            yield request.get(routes.boards.getById(boardId)).expect(404);
        }));
        it("should delete board's tasks upon deletion", () => __awaiter(void 0, void 0, void 0, function* () {
            // Setup:
            const res = yield request
                .post(routes.boards.create)
                .set('Accept', 'application/json')
                .send(TEST_BOARD_DATA)
                .expect(201);
            const boardId = res.body.id;
            const boardTaskResponses = yield Promise.all(Array.from(Array(5)).map((_, idx) => request
                .post(routes.tasks.create(boardId))
                .send({
                title: `Task #${idx + 1}`,
                order: idx + 1,
                description: 'Lorem ipsum',
                boardId,
                userId: null,
                columnId: null
            })
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/)));
            const boardTaskIds = boardTaskResponses.map(response => response.body.id);
            yield Promise.all(boardTaskIds.map((taskId) => __awaiter(void 0, void 0, void 0, function* () {
                return request
                    .get(routes.tasks.getById(boardId, taskId))
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then(response => expect(response.body.boardId).to.equal(boardId));
            })));
            // Test:
            yield request
                .delete(routes.boards.delete(boardId))
                .then(response => expect(response.status).oneOf([200, 204]));
            yield Promise.all(boardTaskIds.map((taskId) => __awaiter(void 0, void 0, void 0, function* () { return request.get(routes.tasks.getById(boardId, taskId)).expect(404); })));
        }));
    });
});
//# sourceMappingURL=boards.test.js.map