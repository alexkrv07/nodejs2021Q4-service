"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const boards_memory_repository_1 = __importDefault(require("./boards.memory.repository"));
const tasks_memory_repository_1 = __importDefault(require("../tasks/tasks.memory.repository"));
const board_model_1 = require("./board.model");
const getAll = () => boards_memory_repository_1.default.getAll();
const createBoard = (board) => {
    const newBoard = new board_model_1.Board(board);
    boards_memory_repository_1.default.addBoard(newBoard);
    return newBoard;
};
const getBoardBy = (id) => {
    const boards = getAll();
    const board = boards.find(currentBoard => currentBoard.id === id);
    if (!board) {
        return false;
    }
    return board;
};
const updateBoardBy = (id, bodyBoard) => {
    const boards = getAll();
    const index = boards.findIndex(currentBoard => currentBoard.id === id);
    if (index === -1) {
        return false;
    }
    const oldBoard = boards[index];
    const updatedBoard = Object.assign(Object.assign({}, bodyBoard), { id: oldBoard.id });
    // Object.keys(bodyBoard).forEach(key => {
    //   if (typeof key !== "undefined") {
    //     updatedBoard[key] = bodyBoard[key];
    //   }
    // });
    boards[index] = updatedBoard;
    boards_memory_repository_1.default.updateAll(boards);
    return boards[index];
};
const deleteBoardBy = (id) => {
    const tasks = tasks_memory_repository_1.default.getAll();
    const afterDeletingTasks = tasks.filter(task => task.boardId !== id);
    tasks_memory_repository_1.default.updateAll(afterDeletingTasks);
    const boards = getAll();
    const newBoards = boards.filter(currentBoard => currentBoard.id !== id);
    boards_memory_repository_1.default.updateAll(newBoards);
};
module.exports = { getAll, createBoard, getBoardBy, updateBoardBy, deleteBoardBy };
// interface GenericObject {
//    [key: string]: any,
// }
// const getEquivalentKeys = (object1: GenericObject, object2: GenericObject): Array<string> => {
//    let equivalentKeys = [] as Array<string>;
//    Object.keys(object1).forEach((key: string) => {
//       if (object1[key] === object2[key]) {
//          equivalentKeys.push(key);
//       }
//    });
//    return equivalentKeys;
// }
//# sourceMappingURL=boards.service.js.map