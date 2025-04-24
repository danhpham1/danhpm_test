import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('products_categories')
export class ProductCategoryEntity extends BaseEntity{
    @Column({ name: 'product_id' })
    productID: string;

    @Column({ name: 'category_id' })
    categoryID: string;
}
