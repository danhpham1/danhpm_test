import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Categories1745424992036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Creating categories table...');
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'parent_id',
            type: 'uniqueidentifier',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '250',
            isNullable: true,
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

    //Init data
    await queryRunner.query(`
        INSERT INTO categories (id, name, is_active, created_at, updated_at, is_deleted) VALUES
        (NEWID(), 'SmartPhone', 1, GETDATE(), GETDATE(), 0),
        (NEWID(), 'Laptop', 1, GETDATE(), GETDATE(), 0),
        (NEWID(), 'SmartHome', 1, GETDATE(), GETDATE(), 0)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS categories`);
  }
}
