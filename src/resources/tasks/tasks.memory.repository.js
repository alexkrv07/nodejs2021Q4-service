
let memoryTasks = [];

const getAll = async () => memoryTasks;

const createTask = async (task) => {
  const tasks = await getAll();
  tasks.push(task);
  memoryTasks = tasks;
}

const updateAll = async (tasks) => {
  memoryTasks = tasks;
}

module.exports = { getAll, createTask, updateAll };
