"use strict";
let memoryBoard = [];
const getAll = () => memoryBoard;
const addBoard = (board) => {
    const boards = getAll();
    boards.push(board);
    memoryBoard = boards;
};
const updateAll = (boards) => {
    memoryBoard = boards;
};
module.exports = { getAll, addBoard, updateAll };
//# sourceMappingURL=boards.memory.repository.js.map