import { Board } from "./board.model";

let memoryBoard: Board[] = [];

const getAll = (): Board[] => memoryBoard;

const addBoard = (board: Board) => {
  const boards = getAll();
  boards.push(board);
  memoryBoard = boards;
}

const updateAll = (boards: Board[]) => {
  memoryBoard = boards;
}

export = { getAll, addBoard, updateAll };
