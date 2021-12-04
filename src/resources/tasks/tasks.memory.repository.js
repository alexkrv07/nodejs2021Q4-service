// const { readfile} = require('../../helpers/read-file');
// const { createFile } = require('../../helpers/create-file');
// const { updateTasksBy } = require('./tasks.service');

let memoryTasks = [];

const getAll = async () =>
  // setTimeout(() => memoryTasks, 0);
  // const tasks = await memoryTasks;
  // const data = await readfile('tasks.json');
  // console.log(data)
  // const tasks = JSON.parse(data);
  // return tasks;
   memoryTasks
;

const createTask = async (task) => {
  const tasks = await getAll();
  // console.log('update tasks.json', tasks);
  tasks.push(task);
  // console.log('update tasks.json', tasks);
  // await createFile('tasks.json', JSON.stringify(tasks));
  memoryTasks = tasks;
}

const updateAll = async (tasks) => {
  // console.log('update tasks.json', updateTasksBy);
  // await createFile('tasks.json', JSON.stringify(tasks));
  memoryTasks = tasks;
}


module.exports = { getAll, createTask, updateAll };
