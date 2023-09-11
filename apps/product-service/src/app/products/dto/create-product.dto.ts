import { IsNotEmpty, IsString } from "class-validator";
import { ICreateProductDto } from "../../common/interfaces/create-product-dto.interface";

export class CreateProductDto implements ICreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    creatorId: string;

    @IsNotEmpty()
    stock: number;

    @IsNotEmpty()
    price: number;
}
