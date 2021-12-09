"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// import { v4 as uuidv4 } from 'uuid';
const user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
const tasks_memory_repository_1 = __importDefault(require("../tasks/tasks.memory.repository"));
const user_model_1 = require("./user.model");
const getAll = () => user_memory_repository_1.default.getAll();
const createUser = (user) => {
    const newUser = new user_model_1.User(user);
    user_memory_repository_1.default.addUser(newUser);
    return newUser;
};
const getUserBy = (id) => {
    const users = getAll();
    const user = users.find(currentUser => currentUser.id === id);
    if (!user) {
        return false;
    }
    return user;
};
const updateUserBy = (id, bodyUser) => {
    const users = getAll();
    const index = users.findIndex(currentUser => currentUser.id === id);
    if (index === -1) {
        return false;
    }
    const oldUser = users[index];
    const updatedUser = Object.assign(Object.assign({}, bodyUser), { id: oldUser.id });
    // Object.keys(bodyUser).forEach(key => {
    //   if (typeof key === 'string') {
    //     updatedUser[key] = bodyUser[key];
    //   }
    // });
    users[index] = updatedUser;
    user_memory_repository_1.default.updateAll(users);
    return users[index];
};
const deleteUserBy = (id) => {
    const userTasks = tasks_memory_repository_1.default.getAll();
    const afteDeletingTasks = userTasks.map(task => {
        if (task.userId === id) {
            const updateTask = Object.assign(Object.assign({}, task), { userId: null });
            return updateTask;
        }
        return task;
    });
    tasks_memory_repository_1.default.updateAll(afteDeletingTasks);
    const users = getAll();
    const newUsers = users.filter(currentUser => currentUser.id !== id);
    user_memory_repository_1.default.updateAll(newUsers);
};
module.exports = { getAll, createUser, getUserBy, updateUserBy, deleteUserBy };
//# sourceMappingURL=user.service.js.map