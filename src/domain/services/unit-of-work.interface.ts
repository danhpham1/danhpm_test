import { QueryRunner } from "typeorm";

export interface IUnitOfWork {
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    release(): Promise<void>;
    getQueryRunner(): QueryRunner;
}