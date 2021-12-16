import express from 'express';
import boardsService from './boards.service';
import tasksService from '../tasks/tasks.service';
import { StatusCode } from '../../common/constants';
import  { checkvalidityUIID } from '../../common/check-valid-uiid';
import { IBoard } from '../../common/i-board';
import { ITask } from '../../common/i-task';

const router = express.Router();

router.route('/')
  .get( async (req: express.Request, res: express.Response) => {
    const boards = boardsService.getAll();
   res
    .status(StatusCode.OK)
    .json(boards);
  })
  .post( async (req: express.Request, res: express.Response) => {
    const BoardBody: IBoard = req.body;
    const newBoard = boardsService.createBoard(BoardBody);
    res
      .status(StatusCode.Created)
      .json(newBoard);
});

router.route('/:boardId')
  .get( async (req: express.Request, res: express.Response) => {
    const {boardId} = req.params;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } else {
      const board = boardsService.getBoardBy(boardId);
      if (!board) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Board id = ${boardId} is not found`});
      } else {
        res
        .status(StatusCode.OK)
        .json(board);
      }
    }

  })
  .put( async (req: express.Request, res: express.Response) => {
    const {boardId} = req.params;
    const BoardBody: IBoard = req.body;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } else {
      const updatedBoard = boardsService.updateBoardBy(boardId, BoardBody);
      if (!updatedBoard) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Board id = ${boardId} is not found`});
      } else {
        res
        .status(StatusCode.OK)
        .json(updatedBoard);
      }
    }
  })
  .delete( async (req: express.Request, res: express.Response) => {
    const {boardId} = req.params;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } {
      const deletedBoard = boardsService.getBoardBy(boardId);
      if (!deletedBoard) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Board id = ${boardId} is not found`});
      } else {
        await boardsService.deleteBoardBy(boardId);
        res
          .status(StatusCode.NoContent)
          .end();
      }
    }

});

router.route('/:boardId/tasks')
  .get( async (req: express.Request, res: express.Response) => {
    const {boardId} = req.params;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } else {
      const tasks = tasksService.getAll(boardId);
      res
        .status(StatusCode.OK)
        .json(tasks);
    }

  })
  .post( async (req: express.Request, res: express.Response) => {
    const TaskBody: ITask = req.body;
    const {boardId} = req.params;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } else {

      const newTask = tasksService.createTask(TaskBody, boardId);
      if (!newTask) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Board id = ${boardId} is not found`});
      } else {
        res
        .status(StatusCode.Created)
        .json(newTask);
      }
    }
});

router.route('/:boardId/tasks/:taskId')
  .get( async (req: express.Request, res: express.Response) => {
    const {taskId} = req.params;
    const {boardId} = req.params;
    if (!checkvalidityUIID(taskId) || !checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    } else {
      const task = tasksService.getTaskBy(taskId, boardId);
      if (!task) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Task id = ${taskId} is not found`});
      } else {
        res
        .status(StatusCode.OK)
        .json(task);
      }
    }

  })
  .put( async (req: express.Request, res: express.Response) => {
    const {taskId} = req.params;
    const {boardId} = req.params;
    const TaskBody: ITask = req.body;
    if (!checkvalidityUIID(taskId) || !checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    } else {
      const updatedTask = tasksService.updateTasksBy(taskId, TaskBody, boardId );
      if (!updatedTask) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Task id = ${taskId} is not found`});
      } else {
        res
          .status(StatusCode.OK)
          .json(updatedTask);
      }
    }

  })
  .delete( async (req: express.Request, res: express.Response) => {
    const {taskId} = req.params;
    const {boardId} = req.params;
    if (!checkvalidityUIID(taskId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    } else {
      const deletedTask = tasksService.getTaskBy(taskId, boardId);
      if (!deletedTask) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Task id = ${taskId} is not found`});
      } else {
       tasksService.deleteTaskBy(taskId,  boardId);
        res
          .status(StatusCode.NoContent)
          .end();
      }
    }

});



export = router;
