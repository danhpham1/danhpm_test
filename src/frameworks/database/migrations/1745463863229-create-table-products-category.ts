import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProductsCategory1745463863229
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_categories',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'category_id',
            type: 'uniqueidentifier',
            isNullable: true,
          },
          {
            name: 'product_id',
            type: 'uniqueidentifier',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'created_by',
            type: 'nvarchar',
            length: '250',
            isNullable: true,
          },
          {
            name: 'is_deleted',
            type: 'bit',
            default: 0,
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'deleted_by',
            type: 'nvarchar',
            length: '250',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_categories', true);
  }
}
