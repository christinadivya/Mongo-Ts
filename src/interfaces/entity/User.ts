// interfaces/IUser.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    age?: number;
    domain?: string;
    experience?: string;
    email?: string;
    password?: string;
  }