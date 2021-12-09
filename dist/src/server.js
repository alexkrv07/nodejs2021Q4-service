"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./common/config");
const app_1 = __importDefault(require("./app"));
// const PORT = 4000;
app_1.default.listen(config_1.PORT, () => console.log(`App is running on http://localhost:${config_1.PORT}`));
//# sourceMappingURL=server.js.map