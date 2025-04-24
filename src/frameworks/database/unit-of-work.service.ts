import { IUnitOfWork } from '@/domain/services/unit-of-work.interface';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class UnitOfWork implements IUnitOfWork, OnModuleDestroy {
  private queryRunner: QueryRunner;

  constructor(private readonly dataSource: DataSource) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  async onModuleDestroy() {
    await this.queryRunner.release();
  }

  async startTransaction(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    this.queryRunner.commitTransaction();
  }

  async rollbackTransaction(): Promise<void> {
    this.queryRunner.rollbackTransaction();
  }

  async release(): Promise<void> {
    this.queryRunner.release();
  }

  getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }
}
