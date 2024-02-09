import { NextFunction, Request, Response } from "express";
import customExceptions from "../helpers/customException";
import { UserDAO } from "../daos/user.dao";
import { verifyToken } from "../lib/jwt";
import { IUser } from "../interfaces/entity/User";

/**
 * JWT Authenticator
 * @public
 */
export default class JwtAuthenticator {
  constructor() {
    // Bind the authenticateAndAuthorizeToken method to the JwtAuthenticator instance
    this.authenticateAndAuthorizeToken = this.authenticateAndAuthorizeToken.bind(this);
  }

  /**
   * This function is used to authorize and authenticate user
   */
  async authenticateAndAuthorizeToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const typedReq = req as Request & { user?: IUser, token?: string };
      const jwtToken = typedReq.get("authorization");
      if (!jwtToken) {
        throw customExceptions.validationError("Authorization token is missing");
      }
      const userToken = await verifyToken(jwtToken);
      if (!userToken || !userToken._id) {
        throw customExceptions.validationError("Invalid token");
      }
      const user = await UserDAO.getUserById(userToken._id);
      if (!user) {
        throw customExceptions.validationError("User not found");
      }
      typedReq.user = user;
      typedReq.token = jwtToken;
      next();
    } catch (e) {
      console.error(e.message);
      next(e);
    }
  }
}
