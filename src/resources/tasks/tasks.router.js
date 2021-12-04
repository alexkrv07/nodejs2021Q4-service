const router = require('express').Router();
const tasksService = require('./tasks.service');
const { StatusCode } = require('../../common/constants');
const { checkvalidityUIID } = require('../../common/check-valid-uiid');

router.route('/')
  .get( async (req, res) => {
    const tasks = await tasksService.getAll();
   res
    .status(StatusCode.OK)
    .json(tasks);
  })
  .post( async (req, res) => {
    const TaskBody = req.body;
    const {boardId} = req.params;
    const newTask = await tasksService.createTask(TaskBody, boardId);
    res
      .status(StatusCode.Created)
      .json(newTask);

});

router.route('/:taskId')
  .get( async (req, res) => {
    const {taskId} = req.params;
    if (!checkvalidityUIID(taskId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    }
    const task = await tasksService.getTaskBy(taskId);
    res
      .status(StatusCode.OK)
      .json(task);
  })
  .put( async (req, res) => {
    const {taskId} = req.params;
    const TaskBody = req.body;
    if (!checkvalidityUIID(taskId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    }
    const updatedTask = await tasksService.updateTaskBy(taskId, TaskBody);
    res
      .status(StatusCode.OK)
      .json(updatedTask);
  })
  .delete( async (req, res) => {
    const {taskId} = req.params;
    if (!checkvalidityUIID(taskId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `Task id = ${taskId} is not valid`});
    } else {
      const task = await tasksService.getTaskBy(taskId);
      if (!task) {
        res
        .status(StatusCode.NotFound)
        .json({error: `Task id = ${taskId} is not found`});
      } else {
        await tasksService.deleteTaskBy(taskId);
        res
          .status(StatusCode.NoContent)
          .end();
      }
    }
});

module.exports = router;
