import { PersistenceService } from '../services/persistence/persistence.service';
import { TagValidation } from './tag-validation';

export class Tag {
  constructor(
    public tagId: number,
    public tag: string,
    public user: string,
    public tagValidations: TagValidation[],
    public createdAt: string,
  ) { }

  getValidationCount(): number {
    return this.tagValidations.length;
  }
}
