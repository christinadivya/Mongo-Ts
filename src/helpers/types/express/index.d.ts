import { IUser } from "../../../interfaces/entity/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      token?: string;
    }
  }
}

