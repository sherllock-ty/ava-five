import { Controller, Get, Post, Body, ValidationPipe, UnauthorizedException, UseGuards } from '@nestjs/common';
import { IAuthInfoDto } from '../common/interfaces/auth-info-dto.interface';
import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authDto: AuthDto): Promise<IAuthInfoDto>{
      const userInfo = await this.authService.signIn(authDto);
      if(!userInfo){
          throw new UnauthorizedException('bad credentials');
      } else{
          return userInfo;
      }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async jwtAuthCheck(){
      return {"status":"authenticated"}
  }
}
