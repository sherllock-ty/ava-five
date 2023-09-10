import {
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';
import { Roles, rolesArray } from '../../common/enum/roles.enum';
import { ICreateUserDto } from '../../common/interfaces/create-user-dto.interface';


export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsIn([...rolesArray])
  role: Roles;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @Match('password')
  @IsNotEmpty()
  passwordConfirmation: string;
}
