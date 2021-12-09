"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const { v4: uuidv4 } = require('uuid');
const tasks_memory_repository_1 = __importDefault(require("./tasks.memory.repository"));
const boards_service_1 = __importDefault(require("../boards/boards.service"));
const task_model_1 = require("./task.model");
const getAll = (boardId) => {
    const allTasks = tasks_memory_repository_1.default.getAll();
    const boardTasks = allTasks.filter(task => task.boardId === boardId);
    return boardTasks;
};
const createTask = (task, boardId) => {
    const newTask = new task_model_1.Task(task);
    newTask.boardId = boardId;
    const newColumn = {
        id: newTask.id,
        title: newTask.title,
        order: newTask.order,
    };
    const updatedboard = boards_service_1.default.getBoardBy(boardId);
    if (!updatedboard) {
        return false;
    }
    updatedboard.columns.push(newColumn);
    boards_service_1.default.updateBoardBy(boardId, updatedboard);
    tasks_memory_repository_1.default.addTask(newTask);
    return newTask;
};
const getTaskBy = (id, boardId) => {
    const tasks = getAll(boardId);
    const task = tasks.find(currentTask => currentTask.id === id);
    if (!task) {
        return false;
    }
    return task;
};
const updateTasksBy = (id, bodyTask, boardId) => {
    const tasks = getAll(boardId);
    const index = tasks.findIndex(currentTask => currentTask.id === id);
    if (index === -1) {
        return false;
    }
    const oldTask = tasks[index];
    const updatedTask = Object.assign(Object.assign({}, bodyTask), { id: oldTask.id });
    //  const bodyKeys = Object.keys(bodyTask);
    //  type I2 = keyof ITask;
    //  bodyKeys.forEach(key => {
    //    const updateProp = key;
    //     updatedTask[updateProp] = bodyTask[updateProp];
    //   });
    tasks[index] = updatedTask;
    tasks_memory_repository_1.default.updateAll(tasks);
    return tasks[index];
};
const deleteTaskBy = (id, boardId) => {
    const updatedboard = boards_service_1.default.getBoardBy(boardId);
    if (!updatedboard) {
        return;
    }
    updatedboard.columns = updatedboard.columns.filter(column => column.id !== id);
    boards_service_1.default.updateBoardBy(boardId, updatedboard);
    const tasks = getAll(boardId);
    const newTasks = tasks.filter(currentTask => currentTask.id !== id);
    tasks_memory_repository_1.default.updateAll(newTasks);
};
module.exports = { getAll, createTask, getTaskBy, updateTasksBy, deleteTaskBy };
// function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
//   return obj[key]
//  }
//# sourceMappingURL=tasks.service.js.map