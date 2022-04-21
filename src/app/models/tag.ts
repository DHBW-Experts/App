import { PersistenceService } from '../services/persistence.service';
import { TagValidation } from './tag-validation';

export class Tag {
  tagValidations: Array<TagValidation>;

  tagId: number;
  tag: String;
  user: number;
  tmsCreated: String;
  userNavigation: String;

  constructor(
    private persistence: PersistenceService,
  ) { }

  /*   tagValidations: [];

  getValidation(index: number): TagValidation {
    return this.validations[index];
  } */

  getValidationCount() {
    this.persistence.tag.getValidations(this.tagId).then(validations => {
      const tagVal = validations;
      return tagVal.length;
    });
  }
}
