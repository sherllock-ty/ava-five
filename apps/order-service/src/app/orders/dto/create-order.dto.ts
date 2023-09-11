import { IsNotEmpty } from "class-validator";
import { OrderStatus } from "../../common/enum/order-status.enum";
import { ICreateOrderDto } from "../../common/interfaces/create-order-dto.interface";
import { IProductEntry } from "../../common/interfaces/product-entry.interface";

export class CreateOrderDto implements ICreateOrderDto {
    @IsNotEmpty()
    userId:string;
    @IsNotEmpty()
    product_entries:IProductEntry[];

}
