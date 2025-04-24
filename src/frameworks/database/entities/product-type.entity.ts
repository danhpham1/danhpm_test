import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';

@Entity('products_types')
export class ProductTypeEntity extends BaseEntity {
  @Column({ name: 'product_id' })
  productID: string;

  @Column({ name: 'type_id' })
  typeID: string;

  @OneToOne(() => ProductEntity, (product) => product.productType)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
