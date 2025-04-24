import { IType } from '../../interfaces/type/types.interfact';
import { BaseEntity } from '../base.entity';

export class Type extends BaseEntity implements IType {
  name: string;
}
