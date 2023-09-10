import { Column, Entity, PrimaryColumn } from "typeorm";
import { IProduct } from "../../common/interfaces/product.interface";


@Entity()
export class Product implements IProduct{
    @PrimaryColumn({ type: 'varchar', generated: 'uuid' })
    id: string ;
    @Column()
    name: string;
    @Column()
    stock: number;
    @Column()
    price: number;
    @Column()
    creatorId: string;
}
