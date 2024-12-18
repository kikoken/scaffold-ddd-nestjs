import { UserProps } from "../models/user.model";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    active: boolean;
    validateAccount: Date | null;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserWithoutPassword = Omit<UserProps, 'password'>;

export interface IUserRepository {
  findByEmail(email: string): Promise<UserWithoutPassword | null>;
  findByDni(dni: string): Promise<UserProps | null>;
  create(user: UserProps): Promise<UserProps>;
  update(user: UserProps): Promise<UserProps>;
}