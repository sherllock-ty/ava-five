import { IProductEntry } from "../../common/interfaces/product-entry.interface";
import { Column, Entity, PrimaryColumn } from "typeorm";





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

}



