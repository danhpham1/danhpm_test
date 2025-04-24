import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('types')
export class TypeEntity extends BaseEntity {
  @Column({ name: 'name', length: 250, nullable: false })
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;
}
