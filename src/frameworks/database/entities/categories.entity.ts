import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 250, nullable: false })
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @Exclude()
  @Column({ name: 'deleted_at' })
  deletedAt: Date;

  @Exclude()
  @Column({ name: 'deleted_by' })
  deletedBy: string;
}
