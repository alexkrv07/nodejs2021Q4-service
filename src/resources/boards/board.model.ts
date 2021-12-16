import { v4 as uuidv4 } from 'uuid';
import { IColumns } from '../../common/i-columns';
import { IBoard } from '../../common/i-board';

export class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumns[];

  constructor(bodyBoard: IBoard = {
    id: uuidv4() as string,
    title: 'Autotest board',
    columns: [] as IColumns[]
  })  {
    this.id = uuidv4() as string;
    this.title = bodyBoard.title as string;
    this.columns = bodyBoard.columns as IColumns[];
  }

  // setID(id?: string): void {
  //   if (!id) {
  //     this.id = uuidv4() as string;
  //   } else {
  //     this.id = id;
  //   }
  // }

  // setColunns(columns?: IColumns[]) {
  //   if (!columns) {
  //     this.columns = [] as IColumns[];
  //   } else {
  //     this.columns = columns;
  //   }
  // }

  // setTitle(title?:string) {
  //   if (!title) {
  //     this.title = 'Autotest board';
  //   } else {
  //     this.title = title;
  //   }
  // }
}
