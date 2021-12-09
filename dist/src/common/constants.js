"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.RequiredFildPerson = exports.PatternUUID = exports.Method = exports.Separator = void 0;
const Separator = '/';
exports.Separator = Separator;
const PatternUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
exports.PatternUUID = PatternUUID;
const Method = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
};
exports.Method = Method;
const RequiredFildPerson = {
    name: 'name',
    age: 'age',
    hobbies: 'hobbies'
};
exports.RequiredFildPerson = RequiredFildPerson;
const StatusCode = {
    OK: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    InternalServerError: 500
};
exports.StatusCode = StatusCode;
//# sourceMappingURL=constants.js.map