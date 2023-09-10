import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { AuthInfoDto } from './dto/auth-info.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        ){}

    // async signUp(authDto: AuthDto): Promise<void>{
    //     const {username, password} = authDto;
    //     const user = new this.usersModel();
    //     user.username = username;
    //     user.salt = await bcrypt.genSalt();
    //     user.password = await bcrypt.hash(password, user.salt);
       
    //     try {
    //         await user.save()
    //     } catch (error) {
    //         if(error.code === 11000) {
    //             throw new ConflictException('username already exists');
    //         } else {
    //             throw new InternalServerErrorException();         
    //         }         
    //     }
    // }

    async signIn(authDto: AuthDto): Promise<AuthInfoDto>{
        const user = await this.usersService.findByUsernameAndPassword(authDto);
        if(!user){
            return null;
        }
        const authInfo = new AuthInfoDto();
        authInfo.accessToken = this.createJWT(user);
        return authInfo;
    }

    private createJWT(payload){
        const accessToken = this.jwtService.sign(payload);
        return  accessToken ;
    }
}