import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../common/i-task';

export class Task implements ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor(bodyTask: ITask = {
    id:  uuidv4() as string,
    title:'Autotest task',
    order:0,
    description:'Lorem ipsum',
    userId: null,
    boardId: null,
    columnId: null
  })  {
    this.id = uuidv4() as string;
    this.title = bodyTask.title ? bodyTask.title : 'Autotest task';
    this.order = bodyTask.order ? bodyTask.order : 0;
    this.description = bodyTask.description ? bodyTask.description : 'Lorem ipsum';
    this.userId = bodyTask.userId ? bodyTask.userId : null;
    this.boardId = bodyTask.boardId ? bodyTask.boardId : null;
    this.columnId = bodyTask.boardId ? bodyTask.boardId : null;
  }

  // setID(id?: string): string {
  //   if (!id) {
  //     return uuidv4() as string;
  //   }
  //     return id;

  // }

  // setTitle(title?:string): string {
  //   if (!title) {
  //     return 'Autotest task';
  //   }
  //     return title;

  // }

  // setDescription(description?:string): string {
  //   if (!description) {
  //     return 'Lorem ipsum';
  //   }
  //     return description;

  // }

  // setOrder(order?:number): number {
  //   if (!order) {
  //     return 0;
  //   }
  //     return order;

  // }

  // setValueOrNull(id?:string): string | null {
  //   if (!id) {
  //     return null;
  //   }
  //     return id;
  // }

  // setUserId(id?:string): string | null {
  //   if (!id) {
  //     return null;
  //   }
  //     return id;
  // }

}
