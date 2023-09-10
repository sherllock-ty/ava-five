import { IProductEntry } from "../../common/interfaces/product-entry.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Order } from "./order.entity";





@Entity()
export class ProductEntry implements IProductEntry{
    @PrimaryColumn({ type: 'varchar', generated: 'uuid' })
    id:string;

    @Column()
    productId:string;

    @Column()
    unit_price:number;

    @Column()
    quantity:number;

    @ManyToOne(type => Order, order => order.productEntries)
    @JoinColumn({ name: 'id' })
    order: Order;

}



