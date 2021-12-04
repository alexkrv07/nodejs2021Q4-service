const { v4: uuidv4 } = require('uuid');
const boardsRepo = require('./boards.memory.repository');
// const tasksService = require('../tasks/tasks.service');
const tasksRepo = require('../tasks/tasks.memory.repository');

const getAll = () => boardsRepo.getAll();

const createBoard = async (board) => {
  const newBoard = board;
  newBoard.id = uuidv4();
  boardsRepo.createBoard(board);
  return newBoard;
}

const getBoardBy = async (id) => {
  const boards = await getAll();
  const board = boards.find(currentBoard => currentBoard.id === id);
  if (!board) {
    // console.log('board not found: ', board);
    return false;
  }
  return board;
}

const updateBoardBy = async (id, bodyBoard) => {
  const boards = await getAll();
  const index = boards.findIndex(currentBoard => currentBoard.id === id);
  if (index === -1) {
    // console.log('board not found');
    return false;
  }

  const updatedBoard = boards[index];
  Object.keys(bodyBoard).forEach(key => {
    updatedBoard[key] = bodyBoard[key];
  });

  boards[index] = updatedBoard;
  await boardsRepo.updateAll(boards);
  return boards[index];
}

const deleteBoardBy = async (id) => {

  const tasks = await tasksRepo.getAll();

  const afterDeletingTasks = tasks.filter(task => task.boardId !== id);
  await tasksRepo.updateAll(afterDeletingTasks);

  const boards = await getAll();
  const newBoards = boards.filter(currentBoard => currentBoard.id !== id);
  await boardsRepo.updateAll(newBoards);
}

module.exports = { getAll, createBoard, getBoardBy, updateBoardBy, deleteBoardBy };
