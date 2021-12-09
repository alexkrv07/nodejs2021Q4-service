"use strict";
let memoryUsers = [];
const getAll = () => memoryUsers;
const addUser = (user) => {
    const users = getAll();
    users.push(user);
    memoryUsers = users;
};
const updateAll = (users) => {
    memoryUsers = users;
};
module.exports = { getAll, addUser, updateAll };
//# sourceMappingURL=user.memory.repository.js.map