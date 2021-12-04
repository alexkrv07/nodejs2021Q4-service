// const { readfile} = require('../../helpers/read-file');
// const { createFile } = require('../../helpers/create-file');

let memoryUsers = []

const getAll = async () =>
  // const data = await readfile('users.json');
  // console.log(data)
  // const users = JSON.parse(data);
  // return users || [];
   memoryUsers
;

const createUser = async (user) => {
  const users = await getAll();
  users.push(user);
  // console.log('update users.json');
  // await createFile('users.json', JSON.stringify(users));
  memoryUsers = users;
}

const updateAll = async (users) => {
  // console.log('update users.json');
  // await createFile('users.json', JSON.stringify(users));
  memoryUsers = users;
}


module.exports = { getAll, createUser, updateAll };
