import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';

@Entity('products_images')
export class ProductImageEntity extends BaseEntity {
  @Column({ name: 'product_id' })
  productID: string;

  @Column({ name: 'path' })
  path: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @OneToOne(() => ProductEntity, (product) => product.productType)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
