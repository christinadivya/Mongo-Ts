// interfaces/IUser.ts
import { Document } from "mongoose";
import { IUser } from "./User";

export interface ILoginData extends IUser, Document {
  token?: string;
}
