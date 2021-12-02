const { readfile} = require('../../helpers/read-file');
const { createFile } = require('../../helpers/create-file');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  const data = await readfile('users.json');
  const users = JSON.parse(data);
  return users || [];
};

const createUser = async (user) => {
  const users = await getAll();
  users.push(user);
  await createFile('users.json', JSON.stringify(users));
}

const getUserBy = async (id) => {
  const users = await getAll();
  const user = users.find(currentUser => currentUser.id === id);
  return user;
}

const putUserBy = async (id, newUser) => {
  console.log(newUser)
  const users = await getAll();
  const index = users.findIndex(currentUser => currentUser.id === id);
  const updateUser = users[index];
  // for (let key of Object.keys(newUser)) {
  //   updateUser[key] = newUser[key];
  // }
  Object.keys(newUser).forEach(key => {
    updateUser[key] = newUser[key];
  })
  users[index] = updateUser;
  console.log(users[index])
  await createFile('users.json', JSON.stringify(users));
  return users[index];
}

const deleteUserBy = async (id) => {
  const users = await getAll();
  const newUsers = users.filter(currentUser => currentUser.id !== id);
  await createFile('users.json', JSON.stringify(newUsers));
}

module.exports = { getAll, createUser, getUserBy, putUserBy, deleteUserBy };
