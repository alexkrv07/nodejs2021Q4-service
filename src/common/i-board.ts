import { IColumns } from './i-columns';

export interface IBoard {
  id: string,
  title: string,
  columns: IColumns[]
}
