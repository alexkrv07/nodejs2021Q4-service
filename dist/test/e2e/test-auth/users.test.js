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
const TEST_USER_DATA = {
    name: 'TEST_USER',
    login: 'test_user',
    password: 'T35t_P@55w0rd'
};
describe('Users suite', () => {
    describe('GET all users', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.get(routes.users.getAll).expect(401);
        }));
    });
    describe('GET user by id', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.get(routes.users.getById('123')).expect(401);
        }));
    });
    describe('POST', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .post(routes.users.create)
                .send(TEST_USER_DATA)
                .expect(401);
        }));
    });
    describe('PUT', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .put(routes.users.update('12345'))
                .send(TEST_USER_DATA)
                .expect(401);
        }));
    });
    describe('DELETE', () => {
        it('should get 401 without token presented ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.delete(routes.users.delete('12345')).expect(401);
        }));
    });
});
//# sourceMappingURL=users.test.js.map