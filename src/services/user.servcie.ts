// services/UserService.ts
import { UserDAO } from "../daos/user.dao";
import { IUser } from "../interfaces/entity/User";
import { hashPassword } from "../lib/bcrypt";

export class UserService {
  userDao: UserDAO;
  constructor(userDao: UserDAO) {
    this.userDao = userDao;
  }
  async createUser(userData: IUser): Promise<IUser> {
    // hash password
    const hashedPassword = await hashPassword(userData.password);
    const userDataWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };
    return await this.userDao.createUser(userDataWithHashedPassword);
  }

  async getUsers(searchTerm: string): Promise<IUser[]> {
    return await this.userDao.getUsers(searchTerm);
  }

  async getUserById(id: string): Promise<IUser> {
    return await this.userDao.getUserById(id);
  }

  async updateUser(id: string, userData: any) {
    return await this.userDao.updateUser(id, userData);
  }

  async deleteUser(id: string) {
    return await this.userDao.deleteUser(id);
  }
}
