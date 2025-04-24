import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductCategoryEntity } from './product-category.entity';
import { ProductTypeEntity } from './product-type.entity';
import { ProductImageEntity } from './product-image.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column({ name: 'name', length: 250, nullable: false })
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'price', type: 'money' })
  price: number;

  @OneToOne(
    () => ProductCategoryEntity,
    (productCategory) => productCategory.product,
  )
  productCategory: ProductCategoryEntity;

  @OneToOne(() => ProductTypeEntity, (productType) => productType.product)
  productType: ProductTypeEntity;

  @OneToOne(() => ProductImageEntity, (productImage) => productImage.product)
  productImage: ProductImageEntity;
}
