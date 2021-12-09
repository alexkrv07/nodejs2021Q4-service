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
const { request, routes } = require('../lib');
const TEST_BOARD_DATA = {
    title: 'Autotest board',
    columns: [
        { title: 'Backlog', order: 1 },
        { title: 'Sprint', order: 2 }
    ]
};
describe('Boards suite', () => {
    describe('GET all boards', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.get(routes.boards.getAll).expect(401);
        }));
    });
    describe('GET board by id', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.get(routes.boards.getById('12345')).expect(401);
        }));
    });
    describe('POST', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .post(routes.boards.create)
                .set('Accept', 'application/json')
                .send(TEST_BOARD_DATA)
                .expect(401);
        }));
    });
    describe('PUT', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .put(routes.boards.update('12345'))
                .set('Accept', 'application/json')
                .send(TEST_BOARD_DATA)
                .expect(401);
        }));
    });
    describe('DELETE', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.delete(routes.boards.delete('12345')).expect(401);
        }));
    });
});
//# sourceMappingURL=boards.test.js.map