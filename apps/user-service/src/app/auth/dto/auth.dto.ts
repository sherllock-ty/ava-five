import { IsNotEmpty, IsString } from "class-validator";
import { IAuthDto } from "../../common/interfaces/auth-dto.interface";

export class AuthDto implements IAuthDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
