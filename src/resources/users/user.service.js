const { v4: uuidv4 } = require('uuid');
const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/tasks.memory.repository');
// const tasksService = require('../tasks/tasks.service');

const getAll = () => usersRepo.getAll();

const createUser = async (user) => {
  const newUser = user;
  newUser.id = uuidv4();
  usersRepo.createUser(user);
  return newUser;
}
const getUserBy = async (id) => {
  const users = await getAll();
  const user = users.find(currentUser => currentUser.id === id);
  if (!user) {
    return false;
  }
  return user;
}

const updateUserBy = async (id, newUser) => {
  const users = await getAll();
  const index = users.findIndex(currentUser => currentUser.id === id);
  if (index === -1) {
    return false;
  }
  const updatedUser = users[index];
  Object.keys(newUser).forEach(key => {
    updatedUser[key] = newUser[key];
  });

  users[index] = updatedUser;
  await usersRepo.updateAll(users);
  return users[index];
}

const deleteUserBy = async (id) => {

  const userTasks = await tasksRepo.getAll();
  const afteDeletingTasks = userTasks.map(task => {
    if (task.userId === id) {

      const updateTask = {
        ...task,
        userId: null,
      };
      return updateTask;
    }
    return task;
  });
  await tasksRepo.updateAll(afteDeletingTasks);

  const users = await getAll();
  const newUsers = users.filter(currentUser => currentUser.id !== id);
  await usersRepo.updateAll(newUsers);
}

module.exports = { getAll, createUser, getUserBy, updateUserBy, deleteUserBy };
