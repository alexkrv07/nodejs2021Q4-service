// import { v4 as uuidv4 } from 'uuid';
import usersRepo from './user.memory.repository';
import tasksRepo from '../tasks/tasks.memory.repository';
import { User } from './user.model';
import { IUser } from '../../common/i-user';
import { Task } from '../tasks/task.model';

const getAll: (() => User[]) = () => usersRepo.getAll();

const createUser = (user: IUser ) => {
  const newUser = new User(user);
  usersRepo.addUser(newUser);
  return newUser;
}

const getUserBy = (id: string) => {
  const users = getAll();
  const user: User | undefined = users.find(currentUser => currentUser.id === id);
  if (!user) {
    return false;
  }
  return user;
}

const updateUserBy = (id: string, bodyUser: IUser) => {
  const users = getAll();
  const index: number = users.findIndex(currentUser => currentUser.id === id);
  if (index === -1) {
    return false;
  }
  const oldUser: User = users[index];
  const updatedUser: User = {
     ...bodyUser,
     id: oldUser.id
  }


  // Object.keys(bodyUser).forEach(key => {
  //   if (typeof key === 'string') {
  //     updatedUser[key] = bodyUser[key];
  //   }
  // });

  users[index] = updatedUser;
  usersRepo.updateAll(users);
  return users[index];
}

const deleteUserBy = (id: string) => {

  const userTasks: Task[] = tasksRepo.getAll();
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
  tasksRepo.updateAll(afteDeletingTasks);

  const users = getAll();
  const newUsers = users.filter(currentUser => currentUser.id !== id);
  usersRepo.updateAll(newUsers);
}

export = { getAll, createUser, getUserBy, updateUserBy, deleteUserBy };
