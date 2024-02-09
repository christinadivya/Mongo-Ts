// services/UserService.ts
import { UserDAO } from "../daos/user.dao";
import { IUser } from "../interfaces/entity/User";
import { hashPassword } from "../lib/bcrypt";

export class UserService {
  static async createUser(userData: IUser):Promise<IUser> {
    // hash password
    const hashedPassword = await hashPassword(userData.password);
    const userDataWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };
    return await UserDAO.createUser(userDataWithHashedPassword);
  }
  static async getUsers(searchTerm: string):Promise<IUser[]> {
    return await UserDAO.getUsers(searchTerm);
  }

  static async getUserById(id: string):Promise<IUser> {
    return await UserDAO.getUserById(id);
  }

  static async updateUser(id: string, userData: any) {
    return await UserDAO.updateUser(id, userData);
  }

  static async deleteUser(id: string) {
    return await UserDAO.deleteUser(id);
  }
}
