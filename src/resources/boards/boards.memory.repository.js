// const { readfile} = require('../../helpers/read-file');
// const { createFile } = require('../../helpers/create-file');


let memoryBoard = [];

const getAll = async () =>
  // const boards = await memoryBoard;
  // const data = await readfile('boards.json');
  // console.log(data)
  // const boards = JSON.parse(data.trim());
   memoryBoard
;

const createBoard = async (board) => {
  const boards = await getAll();
  boards.push(board);
  // console.log('update boards.json');
  // await createFile('boards.json', JSON.stringify(boards));
  memoryBoard = boards;
}

const updateAll = async (boards) => {
  // console.log('update boards.json');
  // await createFile('boards.json', JSON.stringify(boards));
  memoryBoard = await boards;
}

module.exports = { getAll, createBoard, updateAll };
