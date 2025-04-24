import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProductsImages1745464268567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_images',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'product_id',
            type: 'uniqueidentifier',
            isNullable: true,
          },
          {
            name: 'path',
            type: 'text',
          },
          {
            name: 'file_name',
            type: 'text',
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
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_images', true);
  }
}
