// src/interfaces/dao/user.dao.ts
import { IUser } from '../entity/User';

export interface IUserDao {
  createUser(user: IUser): Promise<IUser>;
  getUsers(searchTerm: string): Promise<IUser[]>;
  getUserById(userId: string): Promise<IUser | null>;
  updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null>;
  deleteUser(userId: string): Promise<boolean>;
}
