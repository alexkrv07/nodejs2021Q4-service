const router = require('express').Router();
const boardsService = require('./boards.service');
// const tasksRouter = require('../tasks/tasks.router');
const tasksService = require('../tasks/tasks.service');
const { StatusCode } = require('../../common/constants');
const { checkvalidityUIID } = require('../../common/check-valid-uiid');

router.route('/')
  .get( async (req, res) => {
    const boards = await boardsService.getAll();
   res
    .status(StatusCode.OK)
    .json(boards);
  })
  .post( async (req, res) => {
    const BoardBody = req.body;
    const newBoard = await boardsService.createBoard(BoardBody);
    res
      .status(StatusCode.Created)
      .json(newBoard);
});

router.route('/:boardId')
  .get( async (req, res) => {
    const {boardId} = req.params;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } else {
      const board = await boardsService.getBoardBy(boardId);
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
  .put( async (req, res) => {
    const {boardId} = req.params;
    const BoardBody = req.body;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } else {
      const updatedBoard = await boardsService.updateBoardBy(boardId, BoardBody);
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
  .delete( async (req, res) => {
    const {boardId} = req.params;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } {
      const deletedBoard = await boardsService.getBoardBy(boardId);
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
  .get( async (req, res) => {
    const {boardId} = req.params;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } else {
      const tasks = await tasksService.getAll(boardId);
      res
        .status(StatusCode.OK)
        .json(tasks);
    }

  })
  .post( async (req, res) => {
    const TaskBody = req.body;
    const {boardId} = req.params;
    if (!checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Board id = ${boardId} is not valid`});
    } else {

      const newTask = await tasksService.createTask(TaskBody, boardId);
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
  .get( async (req, res) => {
    const {taskId} = req.params;
    const {boardId} = req.params;
    if (!checkvalidityUIID(taskId) || !checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    } else {
      const task = await tasksService.getTaskBy(taskId, boardId);
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
  .put( async (req, res) => {
    const {taskId} = req.params;
    const {boardId} = req.params;
    const TaskBody = req.body;
    if (!checkvalidityUIID(taskId) || !checkvalidityUIID(boardId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    } else {
      const updatedTask = await tasksService.updateTasksBy(taskId, TaskBody, boardId );
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
  .delete( async (req, res) => {
    const {taskId} = req.params;
    const {boardId} = req.params;
    if (!checkvalidityUIID(taskId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    } else {
      const deletedTask = await tasksService.getTaskBy(taskId, boardId);
      if (!deletedTask) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Task id = ${taskId} is not found`});
      } else {
        await tasksService.deleteTaskBy(taskId,  boardId);
        res
          .status(StatusCode.NoContent)
          .end();
      }
    }

});



module.exports = router;
