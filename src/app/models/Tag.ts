import { TagValidation } from './tag-validation';

export class Tag {
  tagValidations: Array<TagValidation>;

  tagId: number;
  tag1: String;
  user: number;
  tmsCreated: String;
  userNavigation: String;

  /*   tagValidations: [];

  getValidation(index: number): TagValidation {
    return this.validations[index];
  } */
}
