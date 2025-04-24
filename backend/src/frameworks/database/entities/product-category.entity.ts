import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';
import { CategoriesEntity } from './categories.entity';

@Entity('products_categories')
export class ProductCategoryEntity extends BaseEntity {
  @Column({ name: 'product_id' })
  productID: string;

  @Column({ name: 'category_id' })
  categoryID: string;

  @OneToOne(() => ProductEntity, (product) => product.productCategory)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @OneToOne(() => CategoriesEntity, (category) => category.productCategory)
  @JoinColumn({ name: 'category_id' })
  category: CategoriesEntity;
}
