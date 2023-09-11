import { OrderStatus } from "../enum/order-status.enum";
import { IProductEntry } from "./product-entry.interface";

export interface ICreateOrderDto {
    userId:string;
    product_entries:IProductEntry[];
}