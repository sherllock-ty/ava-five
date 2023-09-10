import { Injectable } from '@nestjs/common';
import { IUser } from '../common/interfaces/user.interface';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userModel: Repository<User>){

  }

  async findById(id): Promise<IUser>{
    let user: IUser;
    try {
        user = await this.userModel.findOneBy(id);
        if(!user){
            return null;
        }
    } catch (error) {
        return null;
    }
    return user;
}

async findAll(): Promise<IUser[]>{
    let users: IUser[]
    try {
        users = await this.userModel.find()
    } catch (error) {
        return null;
    }
    return users;
}

async createOne(user: CreateUserDto): Promise<IUser>{
    const encripted = await this.encryptePassword(user.password);
    let createdUser : any;
    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.role = user.role;
    newUser.password = encripted.password;
    newUser.salt = encripted.salt;
    try {
        createdUser = await this.userModel.save(newUser);
    } catch (error) {
        throw new Error()
    }
    const{password,salt,...userDto} = createdUser;
    return userDto;
}

async deleteOne(id): Promise<IUser>{


    const UserToRemove = await this.userModel.findOneBy(id);

    if (!UserToRemove) {
      return null;
    }
    try {
      await this.userModel.delete(id); 
    } catch (error) {
      throw new Error();
    }
    const{password,salt,...userDto} = UserToRemove;
    return userDto;
}

async updateOne(id, update: UpdateUserDto): Promise<IUser>{
    const { username, email, role, password } = update;
    let user : any = await this.userModel.findOneBy(id);

      if (!user) {
        return null; 
      }

    const { password: encryptedPassword, salt } = await this.encryptePassword(password);
    try {
        user = await this.userModel.createQueryBuilder()
        .update(User)
        .set({
          username,
          email,
          role,
          password: encryptedPassword,
          salt,
        })
        .where('id = :id', { id })
        .returning('*')
        .execute();
    } catch (error) {
        throw new Error();
    }
      return user;
}

async findByUsernameAndPassword(authDto: AuthDto): Promise<IUser>{
    const {username, password: pwd} = authDto;
    let user: any;
    try {
        user = await this.userModel.findOneBy({username})
        if(!user || !(await this.isPasswordCorrect(pwd, user.password, user.salt))){
            return null;
        }
    } catch (error) {
        return null;
    }
    const{password,salt,...userDto} = user;
    return userDto;
}

async encryptePassword(password: string): Promise<{password:string,salt:string}>{
    const salt: string = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    return { password, salt };
}

async isPasswordCorrect(
    password: string,
    encryptedPassword: string,
    salt: string
): Promise<boolean>{

    try{
        return (await bcrypt.hash(password, salt) === encryptedPassword);
    }catch(error){
        console.log(error)
    }
}
}
