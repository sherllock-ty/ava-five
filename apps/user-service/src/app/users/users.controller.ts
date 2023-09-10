import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { IUser } from '../common/interfaces/user.interface';
import { HasRole } from '../common/guard/roles.decorator';
import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { RolesGuard } from '../common/guard/roles.guard';

@Controller()
// @UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) : Promise<IUser>{
    return this.usersService.createOne(createUserDto);
  }

  
  @Get(':id')
  findUser(@Param() id) : Promise<IUser>{
    return this.usersService.findById(id);
  }

  @Get()
  findAll() : Promise<IUser[]>{
    return this.usersService.findAll();
  }

  @Post('/login')
  findByUsernameAndPassword(@Body(ValidationPipe) authDto: AuthDto): Promise<IUser>{
      return this.usersService.findByUsernameAndPassword(authDto);
  }

  @Patch(':id')
  @HasRole('OWNER')
  updateOne(@Param() id, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<IUser>{
      return this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  deleteOne(@Param() id): Promise<IUser>{
      return this.usersService.deleteOne(id);
  }
}
