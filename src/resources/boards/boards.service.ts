import boardsRepo from './boards.memory.repository';
import tasksRepo  from '../tasks/tasks.memory.repository';
import { Board } from './board.model';
import { IBoard } from '../../common/i-board';

const getAll: (() => Board[]) = () => boardsRepo.getAll();

const createBoard = (board: IBoard) => {
  const newBoard = new Board(board);
  boardsRepo.addBoard(newBoard);
  return newBoard;
}

const getBoardBy = (id: string) => {
  const boards = getAll();
  const board = boards.find(currentBoard => currentBoard.id === id);
  if (!board) {
    return false;
  }
  return board;
}

const updateBoardBy = (id: string, bodyBoard: IBoard ) => {
  const boards = getAll();
  const index = boards.findIndex(currentBoard => currentBoard.id === id);
  if (index === -1) {
    return false;
  }


  const oldBoard = boards[index];
  const updatedBoard: Board = {
     ...bodyBoard,
     id: oldBoard.id
  }
  // Object.keys(bodyBoard).forEach(key => {
  //   if (typeof key !== "undefined") {
  //     updatedBoard[key] = bodyBoard[key];
  //   }
  // });

  boards[index] = updatedBoard;
  boardsRepo.updateAll(boards);
  return boards[index];
}

const deleteBoardBy = (id: string) => {

  const tasks = tasksRepo.getAll();
  const afterDeletingTasks = tasks.filter(task => task.boardId !== id);
  tasksRepo.updateAll(afterDeletingTasks);

  const boards = getAll();
  const newBoards = boards.filter(currentBoard => currentBoard.id !== id);
  boardsRepo.updateAll(newBoards);
}

export = { getAll, createBoard, getBoardBy, updateBoardBy, deleteBoardBy };


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
