"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = require("uuid");
class Board {
    constructor(bodyBoard = {
        id: (0, uuid_1.v4)(),
        title: 'Autotest board',
        columns: []
    }) {
        this.id = (0, uuid_1.v4)();
        this.title = bodyBoard.title;
        this.columns = bodyBoard.columns;
    }
}
exports.Board = Board;
//# sourceMappingURL=board.model.js.map