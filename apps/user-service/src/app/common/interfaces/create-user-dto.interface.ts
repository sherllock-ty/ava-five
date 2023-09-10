import { Roles } from "../enum/roles.enum";

export interface ICreateUserDto  {
    username: string;
    email: string;
    role: Roles;
    password: string;
    passwordConfirmation: string;
}