// src/interfaces/services/user.service.ts
import { ILoginData } from "../entity/Types";
import { IUser } from "../entity/User";

export interface IUserService {
  login(loginData: IUser): Promise<ILoginData>;
}
