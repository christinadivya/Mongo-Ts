// src/interfaces/dao/user.dao.ts
import { IUser } from "../entity/User";

export interface IAuthDao {
  login(user: IUser): Promise<IUser>;
}
