import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../common/i-user';

export class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor( {
    id = uuidv4() as string,
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }: IUser) {

    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
    // this.setID(userBody.id);
    // this.setName(userBody.name);
    // this.setLogin(userBody.login);
    // this.setPassword(userBody. password);
  }

  // setID(id?: string): void {
  //   if (!id) {
  //     this.id = uuidv4() as string;
  //   } else {
  //     this.id = id;
  //   }
  // }

  // setName(name?: string): void {
  //   if (!name) {
  //     this.name = 'USER';
  //   } else {
  //     this.name = name;
  //   }
  // }

  // setLogin(login?: string): void {
  //   if (!login) {
  //     this.login = 'user';
  //   } else {
  //     this.login = login;
  //   }
  // }

  // setPassword(password?: string): void {
  //   if (!password) {
  //     this.password = 'P@55w0rd';
  //   } else {
  //     this.password = password;
  //   }
  // }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
// { shape, xPos = 0, yPos = 0 }: PaintOptions
