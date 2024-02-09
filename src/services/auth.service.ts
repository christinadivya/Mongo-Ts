import { IUser } from "../interfaces/entity/User";
import { AuthDAO } from "../daos/auth.dao";
import { verifyPassword } from "../lib/bcrypt";
import customExceptions from "../helpers/customException";
import { generateToken } from "../lib/jwt";
import { ILoginData } from "../interfaces/entity/Types";

export class AuthService {
  static async login(userData: IUser): Promise<ILoginData> {
    // check if user exists
    const existingUser = await AuthDAO.get(userData);
    if (existingUser) {
      // check if password is valid
      const isPasswordValid = await verifyPassword(
        userData.password,
        existingUser.password
      );
      if (isPasswordValid) {
        // generate token
        const token = await generateToken({
          _id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
        });
        // add token to user object
        const userWithToken = { ...existingUser.toObject(), token };
        return userWithToken;
      } else {
        throw customExceptions.validationError("Invalid Password");
      }
    } else {
      throw customExceptions.validationError("Invalid Email");
    }
  }
}
