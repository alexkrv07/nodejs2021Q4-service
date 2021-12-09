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
const tasks_service_1 = __importDefault(require("./tasks.service"));
const constants_1 = require("../../common/constants");
const check_valid_uiid_1 = require("../../common/check-valid-uiid");
const router = express_1.default.Router();
router.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield tasks_service_1.default.getAll();
    res
        .status(constants_1.StatusCode.OK)
        .json(tasks);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskBody = req.body;
    const { boardId } = req.params;
    const newTask = yield tasks_service_1.default.createTask(TaskBody, boardId);
    res
        .status(constants_1.StatusCode.Created)
        .json(newTask);
}));
router.route('/:taskId')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(taskId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Task id = ${taskId} is not valid` });
    }
    const task = yield tasks_service_1.default.getTaskBy(taskId);
    res
        .status(constants_1.StatusCode.OK)
        .json(task);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const TaskBody = req.body;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(taskId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Task id = ${taskId} is not valid` });
    }
    const updatedTask = yield tasks_service_1.default.updateTaskBy(taskId, TaskBody);
    res
        .status(constants_1.StatusCode.OK)
        .json(updatedTask);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(taskId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `Task id = ${taskId} is not valid` });
    }
    else {
        const task = yield tasks_service_1.default.getTaskBy(taskId);
        if (!task) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `Task id = ${taskId} is not found` });
        }
        else {
            yield tasks_service_1.default.deleteTaskBy(taskId);
            res
                .status(constants_1.StatusCode.NoContent)
                .end();
        }
    }
}));
module.exports = router;
//# sourceMappingURL=tasks.router.js.map