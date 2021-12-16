"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
class Task {
    constructor(bodyTask = {
        id: (0, uuid_1.v4)(),
        title: 'Autotest task',
        order: 0,
        description: 'Lorem ipsum',
        userId: null,
        boardId: null,
        columnId: null
    }) {
        this.id = (0, uuid_1.v4)();
        this.title = bodyTask.title ? bodyTask.title : 'Autotest task';
        this.order = bodyTask.order ? bodyTask.order : 0;
        this.description = bodyTask.description ? bodyTask.description : 'Lorem ipsum';
        this.userId = bodyTask.userId ? bodyTask.userId : null;
        this.boardId = bodyTask.boardId ? bodyTask.boardId : null;
        this.columnId = bodyTask.boardId ? bodyTask.boardId : null;
    }
}
exports.Task = Task;
//# sourceMappingURL=task.model.js.map