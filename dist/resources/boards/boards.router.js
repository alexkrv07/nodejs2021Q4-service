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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const boards_service_1 = __importDefault(require("./boards.service"));
const tasks_service_1 = __importDefault(require("../tasks/tasks.service"));
const constants_1 = require("../../common/constants");
const check_valid_uiid_1 = require("../../common/check-valid-uiid");
const router = express_1.default.Router();
router.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boards = boards_service_1.default.getAll();
    res
        .status(constants_1.StatusCode.OK)
        .json(boards);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BoardBody = req.body;
    const newBoard = boards_service_1.default.createBoard(BoardBody);
    res
        .status(constants_1.StatusCode.Created)
        .json(newBoard);
}));
router.route('/:boardId')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(boardId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Board id = ${boardId} is not valid` });
    }
    else {
        const board = boards_service_1.default.getBoardBy(boardId);
        if (!board) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `Board id = ${boardId} is not found` });
        }
        else {
            res
                .status(constants_1.StatusCode.OK)
                .json(board);
        }
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const BoardBody = req.body;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(boardId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Board id = ${boardId} is not valid` });
    }
    else {
        const updatedBoard = boards_service_1.default.updateBoardBy(boardId, BoardBody);
        if (!updatedBoard) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `Board id = ${boardId} is not found` });
        }
        else {
            res
                .status(constants_1.StatusCode.OK)
                .json(updatedBoard);
        }
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(boardId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Board id = ${boardId} is not valid` });
    }
    {
        const deletedBoard = boards_service_1.default.getBoardBy(boardId);
        if (!deletedBoard) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `Board id = ${boardId} is not found` });
        }
        else {
            yield boards_service_1.default.deleteBoardBy(boardId);
            res
                .status(constants_1.StatusCode.NoContent)
                .end();
        }
    }
}));
router.route('/:boardId/tasks')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(boardId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Board id = ${boardId} is not valid` });
    }
    else {
        const tasks = tasks_service_1.default.getAll(boardId);
        res
            .status(constants_1.StatusCode.OK)
            .json(tasks);
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskBody = req.body;
    const { boardId } = req.params;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(boardId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Board id = ${boardId} is not valid` });
    }
    else {
        const newTask = tasks_service_1.default.createTask(TaskBody, boardId);
        if (!newTask) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `Board id = ${boardId} is not found` });
        }
        else {
            res
                .status(constants_1.StatusCode.Created)
                .json(newTask);
        }
    }
}));
router.route('/:boardId/tasks/:taskId')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { boardId } = req.params;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(taskId) || !(0, check_valid_uiid_1.checkvalidityUIID)(boardId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Task id = ${taskId} is not valid` });
    }
    else {
        const task = tasks_service_1.default.getTaskBy(taskId, boardId);
        if (!task) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `Task id = ${taskId} is not found` });
        }
        else {
            res
                .status(constants_1.StatusCode.OK)
                .json(task);
        }
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { boardId } = req.params;
    const TaskBody = req.body;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(taskId) || !(0, check_valid_uiid_1.checkvalidityUIID)(boardId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Task id = ${taskId} is not valid` });
    }
    else {
        const updatedTask = tasks_service_1.default.updateTasksBy(taskId, TaskBody, boardId);
        if (!updatedTask) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `Task id = ${taskId} is not found` });
        }
        else {
            res
                .status(constants_1.StatusCode.OK)
                .json(updatedTask);
        }
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { boardId } = req.params;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(taskId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Task id = ${taskId} is not valid` });
    }
    else {
        const deletedTask = tasks_service_1.default.getTaskBy(taskId, boardId);
        if (!deletedTask) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `Task id = ${taskId} is not found` });
        }
        else {
            tasks_service_1.default.deleteTaskBy(taskId, boardId);
            res
                .status(constants_1.StatusCode.NoContent)
                .end();
        }
    }
}));
module.exports = router;
//# sourceMappingURL=boards.router.js.map