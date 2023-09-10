import { Roles, rolesArray } from '../../common/enum/roles.enum';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn({ type: 'varchar', generated: 'uuid' })
    id: string ;
    @Column()
    username:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    salt:string;
    @Column({type:String,enum:[...rolesArray]})
    role:Roles;


}