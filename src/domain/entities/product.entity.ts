import { IType } from '../interfaces/types.interfact';
import { BaseEntity } from './base.entity';

export class Type extends BaseEntity implements IType {
  name: string;
  price: number;
}
