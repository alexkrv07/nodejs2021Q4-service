"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkvalidityUIID = void 0;
const constants_1 = require("./constants");
function checkvalidityUIID(uiid) {
    return constants_1.PatternUUID.test(uiid);
}
exports.checkvalidityUIID = checkvalidityUIID;
//# sourceMappingURL=check-valid-uiid.js.map