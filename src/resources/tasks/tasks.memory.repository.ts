import { Task } from "./task.model";

let memoryTasks: Task[] = [];

const getAll: (() => Task[]) = () => memoryTasks;

const addTask = (task: Task) => {
  const tasks = getAll();
  tasks.push(task);
  memoryTasks = tasks;
}

const updateAll = (tasks: Task[]) => {
  memoryTasks = tasks;
}

export =  { getAll, addTask, updateAll };
