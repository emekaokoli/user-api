import { Document } from 'typeorm';

// typescript definition for user's schema
export interface UserData extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  active: string;
  photos:string[]
  avatar: string;
}

export type OmittedUser = {
  id: number
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string
  photos: string[]
};

export type user ={
  email: string
  password: string
}