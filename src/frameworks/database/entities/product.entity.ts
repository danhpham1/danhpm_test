import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('products')
export class ProductEntity extends BaseEntity{
  @Column({ name: 'name', length: 250, nullable: false })
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'price', type: 'money' })
  price: number;
}
