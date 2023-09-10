import { Roles } from "../enum/roles.enum";


export interface IUpdateUserDto{
    username: string;
    email: string;
    role: Roles;
    password: string;
}
