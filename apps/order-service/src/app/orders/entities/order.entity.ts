import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { OrderStatus, orderStatusArray } from "../../common/enum/order-status.enum";
import { IOrder } from "../../common/interfaces/order.interface";
import { ProductEntry } from "./product-entry.entity";

export type OrderDocument = Order & Document ;

@Entity()
export class Order implements IOrder{
    @PrimaryColumn({ type: 'varchar', generated: 'uuid' })
    id:string;
    @Column()
    userId:string;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at:Date;
    @Column({ type:String,enum:[...orderStatusArray] })
    status:OrderStatus;
    @OneToMany(type => ProductEntry, productEntry => productEntry.order)
    productEntries: ProductEntry[];
    

}
