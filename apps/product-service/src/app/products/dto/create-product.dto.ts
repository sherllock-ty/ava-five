import { ICreateProductDto } from "../../common/interfaces/create-product-dto.interface";

export class CreateProductDto implements ICreateProductDto {
    name: string;
    creatorId: string;
    stock: number;
    price: number;
}
