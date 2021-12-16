"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_MODE = exports.JWT_SECRET_KEY = exports.MONGO_CONNECTION_STRING = exports.NODE_ENV = exports.PORT = void 0;
// const dotenv = require('dotenv');
// const path = require('path');
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env')
});
const PORT = process.env;
exports.PORT = PORT;
const { NODE_ENV } = process.env;
exports.NODE_ENV = NODE_ENV;
const { MONGO_CONNECTION_STRING } = process.env;
exports.MONGO_CONNECTION_STRING = MONGO_CONNECTION_STRING;
const { JWT_SECRET_KEY } = process.env;
exports.JWT_SECRET_KEY = JWT_SECRET_KEY;
const AUTH_MODE = process.env.AUTH_MODE === 'true';
exports.AUTH_MODE = AUTH_MODE;
//# sourceMappingURL=config.js.map