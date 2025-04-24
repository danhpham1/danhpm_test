import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProduct1745461627131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'price',
            type: 'money',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'is_deleted',
            type: 'bit',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'bit',
            default: 1,
          },
          {
            name: 'deleted_by',
            type: 'varchar',
            isNullable: true,
            length: '250',
          },
          {
            name: 'created_by',
            type: 'varchar',
            isNullable: true,
            length: '250',
          },
          {
            name: 'updated_by',
            type: 'varchar',
            isNullable: true,
            length: '250',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products', true);
  }
}
