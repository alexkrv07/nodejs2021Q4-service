const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const createUser = async (user) => usersRepo.createUser(user);
const getUserBy = async (id) => usersRepo.getUserBy(id);
const putUserBy = async (id, newUser) => usersRepo.putUserBy(id, newUser);
const deleteUserBy = async (id) => usersRepo.deleteUserBy(id);

module.exports = { getAll, createUser, getUserBy, putUserBy, deleteUserBy };
