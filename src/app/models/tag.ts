import { Persistence } from './persistence';
import { TagValidation } from './tag-validation';

export class Tag {
  tagValidations: Array<TagValidation>;

  tagId: number;
  tag: String;
  user: number;
  tmsCreated: String;
  userNavigation: String;

  /*   tagValidations: [];

  getValidation(index: number): TagValidation {
    return this.validations[index];
  } */

  getValidationCount() {
    const persistence = new Persistence();
    const tagPromise = persistence.getTagValidation(this.tagId);
    tagPromise.then((result) => {
      const tagVal = result;
      return tagVal.length;
    });
  }
}
