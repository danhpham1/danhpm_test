import { Injectable } from '@nestjs/common';
import {
  Brackets,
  DataSource,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { IProductRepository } from '@domain/repositories/product-repository.interface';
import {
  ICreateProductBody,
  IProduct,
  IQueryParamProduct,
} from '@domain/interfaces/product/product.interface';

@Injectable()
export class ProductRepository
  extends Repository<ProductEntity>
  implements IProductRepository
{
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  findAll(queryParam: IQueryParamProduct): Promise<[IProduct[], number]> {
    const qb = this.createQueryBuilder('product');
    qb.leftJoinAndSelect('product.productCategory', 'productCategory');
    qb.leftJoinAndSelect('product.productType', 'productType');
    qb.leftJoinAndSelect('product.productImage', 'productImage');

    qb.where(
      new Brackets((qb) => {
        qb.where('product.isDeleted = 0').orWhere('product.isDeleted IS NULL');
      }),
    );

    qb.andWhere(
      new Brackets((qb) => {
        qb.where('productCategory.isDeleted = 0').orWhere(
          'productCategory.isDeleted IS NULL',
        );
      }),
    );

    qb.andWhere(
      new Brackets((qb) => {
        qb.where('productType.isDeleted = 0').orWhere(
          'productType.isDeleted IS NULL',
        );
      }),
    );

    qb.andWhere(
      new Brackets((qb) => {
        qb.where('productImage.isDeleted = 0').orWhere(
          'productImage.isDeleted IS NULL',
        );
      }),
    );

    if (queryParam?.name) {
      qb.andWhere('product.name LIKE :name', {
        name: `%${queryParam.name}%`,
      });
    }

    if (queryParam?.isActive) {
      qb.andWhere('product.isActive = :isActive', {
        isActive: queryParam.isActive ? 1 : 0,
      });
    }

    if (queryParam?.categoryID) {
      const categoryIDS = queryParam.categoryID.split(',');
      qb.andWhere('productCategory.categoryID IN (:...categoryIDS)', {
        categoryIDS: categoryIDS || [],
      });
    }

    if (queryParam?.typeID) {
      const typeIDS = queryParam.typeID.split(',');
      qb.andWhere('productType.typeID IN (:...typeIDS)', {
        typeIDS: typeIDS || [],
      });
    }

    qb.skip((queryParam.page - 1) * queryParam.size);
    qb.take(queryParam.size);

    qb.select([
      'product.id',
      'product.name',
      'product.price',
      'productCategory.id',
      'productCategory.categoryID',
      'productCategory.productID',
      'productType.id',
      'productType.productID',
      'productType.typeID',
      'product.isActive',
      'product.createdAt',
      'product.updatedAt',
      'product.createdBy',
      'product.updatedBy',
      'productImage.productID',
      'productImage.path',
      'productImage.fileName',
    ]);

    return qb.getManyAndCount();
  }

  findById(id: string): Promise<IProduct> {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.productCategory', 'productCategory')
      .leftJoinAndSelect('product.productType', 'productType')
      .leftJoinAndSelect('product.productImage', 'productImage')
      .select([
        'product.id',
        'product.name',
        'product.price',
        'productCategory.id',
        'productCategory.categoryID',
        'productCategory.productID',
        'productType.id',
        'productType.productID',
        'productType.typeID',
        'productImage.productID',
        'productImage.path',
        'productImage.fileName',
      ])
      .where('product.id = :id', { id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('product.isDeleted = :isDeleted', {
            isDeleted: false,
          }).orWhere('product.isDeleted IS NULL');
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('productImage.isDeleted = 0').orWhere(
            'productImage.isDeleted IS NULL',
          );
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('productCategory.isDeleted = 0').orWhere(
            'productCategory.isDeleted IS NULL',
          );
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('productType.isDeleted = 0').orWhere(
            'productType.isDeleted IS NULL',
          );
        }),
      )
      .getOne();
  }

  createProduct(
    data?: ICreateProductBody,
    queryRunner?: QueryRunner,
  ): Promise<IProduct> {
    const productEntity = this.create({
      name: data.name,
      price: data.price,
      createdBy: 'admin',
    });

    if (queryRunner) {
      return queryRunner.manager.save(ProductEntity, productEntity);
    }

    return this.save(productEntity);
  }

  updateProduct(
    body: ICreateProductBody,
    id: string,
    queryRunner?: QueryRunner,
  ): Promise<UpdateResult> {
    if (queryRunner) {
      return queryRunner.manager.update(
        ProductEntity,
        {
          id,
        },
        {
          ...body,
          updatedAt: new Date(),
          updatedBy: 'admin',
        },
      );
    }

    return this.update(
      {
        id,
      },
      {
        ...body,
        updatedAt: new Date(),
        updatedBy: 'admin',
      },
    );
  }

  deleteProduct(id: string, queryRunner?: QueryRunner): Promise<UpdateResult> {
    if (queryRunner) {
      return queryRunner.manager.update(
        ProductEntity,
        {
          id,
        },
        {
          deletedAt: new Date(),
          deletedBy: 'admin',
          isDeleted: true,
          updatedAt: new Date(),
        },
      );
    }
    return this.update(
      {
        id,
      },
      {
        deletedAt: new Date(),
        deletedBy: 'admin',
        isDeleted: true,
        updatedAt: new Date(),
      },
    );
  }
}
