import { TagValidation } from './TagValidation';

export class Tag {
  name: String;
  id: number;
  validations: Array<TagValidation>;
  constructor(name: String) {
    this.name = name;
    //get id from DB
  }
  getValidation(index: number): TagValidation {
    return this.validations[index];
  }
}
