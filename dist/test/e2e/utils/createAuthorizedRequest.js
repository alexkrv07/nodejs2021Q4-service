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
const { routes } = require('../lib');
const createRequestWithToken = (request, token) => {
    const obj = {};
    for (const key in request) {
        if (Object.prototype.hasOwnProperty.call(request, key)) {
            const method = request[key];
            obj[key] = path => method(path).set('Authorization', token);
        }
    }
    return obj;
};
const createAuthorizedRequest = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield request
        .post(routes.login)
        .set('Accept', 'application/json')
        .send({ login: 'admin', password: 'admin' });
    const token = `Bearer ${res.body.token}`;
    return createRequestWithToken(request, token);
});
module.exports = createAuthorizedRequest;
//# sourceMappingURL=createAuthorizedRequest.js.map