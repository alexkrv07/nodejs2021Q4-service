"use strict";
let memoryTasks = [];
const getAll = () => memoryTasks;
const addTask = (task) => {
    const tasks = getAll();
    tasks.push(task);
    memoryTasks = tasks;
};
const updateAll = (tasks) => {
    memoryTasks = tasks;
};
module.exports = { getAll, addTask, updateAll };
//# sourceMappingURL=tasks.memory.repository.js.map