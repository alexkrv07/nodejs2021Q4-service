const { v4: uuidv4 } = require('uuid');
const tasksRepo = require('./tasks.memory.repository');
const boardsService = require('../boards/boards.service');

const getAll = async (boardId) => {
  const allTasks =  await tasksRepo.getAll();
  const boardTasks = allTasks.filter(task => task.boardId === boardId);
  return boardTasks;
}

const createTask = async (task, boardId) => {
  const newTask = task;
  newTask.boardId = boardId;
  newTask.id = uuidv4();

  const newColumn = {
    id: newTask.id,
    title: newTask.title,
    order: newTask.order,
  }
  // console.log(newColumn )
  const updatedboard = await boardsService.getBoardBy(boardId);
  if (!updatedboard ) {
    return false;
  }
  // console.log(boardId, 'board ID');
  // console.log(updatedboard);
  updatedboard.columns.push(newColumn);
  await boardsService.updateBoardBy(boardId, updatedboard);
  tasksRepo.createTask(newTask);
  return newTask;
}

const getTaskBy = async (id, boardId) => {
  const tasks = await getAll(boardId);
  const task = tasks.find(currentTask => currentTask.id === id);
  return task;
}

const updateTasksBy = async (id, bodyTask, boardId) => {
  const tasks = await getAll(boardId);
  const index = tasks.findIndex(currentTask => currentTask.id === id);
  if (index === -1) {
    return false;
  }
  const updatedTask = tasks[index];

  Object.keys(bodyTask).forEach(key => {
    updatedTask[key] = bodyTask[key];
  });

  tasks[index] = updatedTask;
  await tasksRepo.updateAll(tasks);
  return tasks[index];
}

const deleteTaskBy = async (id,  boardId) => {
  // const deletedTask = await getTaskBy(id,  boardId);
  const updatedboard = await boardsService.getBoardBy(boardId);
  // console.log(updatedboard);
  updatedboard.columns = updatedboard.columns.filter(column => column.id !== id);
  await boardsService.updateBoardBy(boardId, updatedboard);

  const tasks = await getAll(boardId);
  const newTasks = tasks.filter(currentTask => currentTask.id !== id);
  await tasksRepo.updateAll(newTasks);
}

module.exports = { getAll, createTask, getTaskBy, updateTasksBy, deleteTaskBy };
