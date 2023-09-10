import {
  IsNotEmpty,
  IsIn,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';
import { Roles, rolesArray } from '../../common/enum/roles.enum';
import { IUpdateUserDto } from '../../common/interfaces/update-user-dto.interface';

export class UpdateUserDto implements IUpdateUserDto {
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

}
