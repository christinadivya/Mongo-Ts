// userModel.ts
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/entity/User";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  domain: { type: String, required: true },
  experience: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
