import { IAuthInfoDto } from "../../common/interfaces/auth-info-dto.interface";

export class AuthInfoDto implements IAuthInfoDto {
    accessToken: string;
}