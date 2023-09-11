import { OrderStatus } from "../enum/order-status.enum";
import { IProductEntry } from "./product-entry.interface";

export interface IOrder {
    id?: string;
    userId:string;
    price:number;
    created_at:Date;
    status:OrderStatus;
    // product_entries:IProductEntry[];
}
