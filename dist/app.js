"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const boards_router_1 = __importDefault(require("./resources/boards/boards.router"));
const constants_1 = require("./common/constants");
const app = (0, express_1.default)();
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../doc/api.yaml'));
app.use(express_1.default.json());
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use('/users', user_router_1.default);
app.use('/boards', boards_router_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(constants_1.StatusCode.InternalServerError)
        .send({ error: `${err.message}` });
    next();
});
exports.default = app;
//# sourceMappingURL=app.js.map