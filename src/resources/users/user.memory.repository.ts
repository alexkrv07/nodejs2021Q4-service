import { User } from "./user.model";

let memoryUsers: User[] = []

const getAll = () => memoryUsers;

const addUser = (user: User) => {
  const users = getAll();
  users.push(user);
  memoryUsers = users;
}

const updateAll = (users: User[]) => {
  memoryUsers = users;
}

export =  { getAll, addUser, updateAll };
