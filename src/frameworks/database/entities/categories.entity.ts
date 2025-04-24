import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductCategoryEntity } from './product-category.entity';

@Entity('categories')
export class CategoriesEntity extends BaseEntity {
  @Column({ name: 'name', length: 250, nullable: false })
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @OneToOne(
    () => ProductCategoryEntity,
    (productCategory) => productCategory.category,
  )
  productCategory: ProductCategoryEntity;
}
