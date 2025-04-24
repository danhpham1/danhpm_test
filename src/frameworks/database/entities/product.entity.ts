import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CategoriesEntity } from './categories.entity';
import { TypeEntity } from './type.entity';

@Entity('products')
export class ProductEntity extends BaseEntity{
  @Column({ name: 'name', length: 250, nullable: false })
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'price', type: 'money' })
  price: number;

  @OneToOne(() => CategoriesEntity, (product) => product.id)
  category: CategoriesEntity;

  @OneToOne(() => TypeEntity, (product) => product.id)
  type: TypeEntity;
}
