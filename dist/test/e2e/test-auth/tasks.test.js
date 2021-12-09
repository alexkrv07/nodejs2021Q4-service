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
const TEST_TASK_DATA = {
    title: 'Autotest task',
    order: 0,
    description: 'Lorem ipsum',
    userId: null,
    boardId: null,
    columnId: null
};
describe('Tasks suite', () => {
    describe('GET all', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.get(routes.tasks.getAll('12345')).expect(401);
        }));
    });
    describe('GET by id', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.get(routes.tasks.getById('12345', '12345')).expect(401);
        }));
    });
    describe('POST', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .post(routes.tasks.create('12345'))
                .set('Accept', 'application/json')
                .send(TEST_TASK_DATA)
                .expect(401);
        }));
    });
    describe('PUT', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .put(routes.tasks.update('12345', '12345'))
                .set('Accept', 'application/json')
                .send(TEST_TASK_DATA)
                .expect(401);
        }));
    });
    describe('DELETE', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.delete(routes.tasks.delete('12345', '12345')).expect(401);
        }));
    });
});
//# sourceMappingURL=tasks.test.js.map