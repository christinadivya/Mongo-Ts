import { IUser } from "../interfaces/entity/User";
import { AuthDAO } from "../daos/auth.dao";
import { verifyPassword } from "../lib/bcrypt";
import customExceptions from "../helpers/customException";
import { generateToken } from "../lib/jwt";
import { ILoginData } from "../interfaces/entity/Types";
import { i18n } from "i18next";

export class AuthService {
  private i18next: i18n;
  private authDAO = new AuthDAO();

  constructor(i18next: i18n, authDAO: AuthDAO ) {
    this.i18next = i18next;
    this.authDAO = authDAO;
  }

  async login(userData: IUser): Promise<ILoginData> {
    // check if user exists
    const existingUser = await this.authDAO.get(userData);
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
        throw customExceptions.validationError(
          this.i18next.t("INVALID_PASSWORD")
        );
      }
    } else {
      throw customExceptions.validationError(this.i18next.t("INVALID_EMAIL"));
    }
  }
}
