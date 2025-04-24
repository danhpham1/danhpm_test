import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('products_types')
export class ProductTypeEntity extends BaseEntity{
    @Column({ name: 'product_id' })
    productID: string;

    @Column({ name: 'type_id' })
    typeID: string;
}
