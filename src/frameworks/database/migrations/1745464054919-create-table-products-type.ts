import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProductsType1745464054919
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_types',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'type_id',
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
            columnNames: ['type_id'],
            referencedTableName: 'types',
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
    queryRunner.dropTable('products_types', true);
  }
}
