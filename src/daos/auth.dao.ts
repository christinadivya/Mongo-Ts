// dao/UserDAO.ts
import User from "../entity/User";
import { IUser } from "../interfaces/entity/User";

export class AuthDAO {
  static async get(userData: IUser): Promise<IUser> {
    const user = await User.findOne({ email: userData.email }).select([
      "_id",
      "name",
      "email",
      "password",
    ]);
    return user;
  }
}
