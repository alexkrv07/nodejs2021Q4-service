"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor({ id = (0, uuid_1.v4)(), name = 'USER', login = 'user', password = 'P@55w0rd' }) {
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
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
exports.User = User;
// { shape, xPos = 0, yPos = 0 }: PaintOptions
//# sourceMappingURL=user.model.js.map