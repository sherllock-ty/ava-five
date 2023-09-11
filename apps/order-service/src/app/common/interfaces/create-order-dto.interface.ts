import { OrderStatus } from "../enum/order-status.enum";
import { IProductEntry } from "./product-entry.interface";

export interface ICreateOrderDto {
    userId:string;
    created_at:Date;
    product_entries:IProductEntry[];
}