import { Roles } from "../enum/roles.enum";


export interface IUser {
    id?: string;
    username: string;
    email:string;
    role: Roles;
}