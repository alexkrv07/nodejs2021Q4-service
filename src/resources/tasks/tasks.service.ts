// const { v4: uuidv4 } = require('uuid');
import tasksRepo from './tasks.memory.repository';
import boardsService from '../boards/boards.service';
import { Task } from './task.model';
import { ITask } from '../../common/i-task';

const getAll = (boardId: string) => {
  const allTasks = tasksRepo.getAll();
  const boardTasks = allTasks.filter(task => task.boardId === boardId);
  return boardTasks;
}

const createTask = (task: ITask, boardId: string) => {
  const newTask = new Task(task);
  newTask.boardId = boardId;

  const newColumn = {
    id: newTask.id,
    title: newTask.title,
    order: newTask.order,
  }
  const updatedboard = boardsService.getBoardBy(boardId);
  if (!updatedboard ) {
    return false;
  }

  updatedboard.columns.push(newColumn);
  boardsService.updateBoardBy(boardId, updatedboard);
  tasksRepo.addTask(newTask);
  return newTask;
}

const getTaskBy = (id: string, boardId: string) => {
  const tasks = getAll(boardId);
  const task = tasks.find(currentTask => currentTask.id === id);
  if (!task) {
    return false;
  }
  return task;
}

const updateTasksBy = (id: string, bodyTask: ITask, boardId: string) => {
  const tasks = getAll(boardId);
  const index = tasks.findIndex(currentTask => currentTask.id === id);
  if (index === -1) {
    return false;
  }
  const oldTask = tasks[index];



  const updatedTask: Task = {
     ...bodyTask,
     id: oldTask.id
  }
//  const bodyKeys = Object.keys(bodyTask);
//  type I2 = keyof ITask;

//  bodyKeys.forEach(key => {
//    const updateProp = key;
//     updatedTask[updateProp] = bodyTask[updateProp];
//   });

  tasks[index] = updatedTask;
  tasksRepo.updateAll(tasks);
  return tasks[index];
}

const deleteTaskBy = (id: string,  boardId: string) => {
  const updatedboard = boardsService.getBoardBy(boardId);
  if (!updatedboard ) {
    return;
  }

  updatedboard.columns = updatedboard.columns.filter(column => column.id !== id);
  boardsService.updateBoardBy(boardId, updatedboard);

  const tasks = getAll(boardId);
  const newTasks = tasks.filter(currentTask => currentTask.id !== id);
  tasksRepo.updateAll(newTasks);

}

export = { getAll, createTask, getTaskBy, updateTasksBy, deleteTaskBy };


// function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
//   return obj[key]
//  }
