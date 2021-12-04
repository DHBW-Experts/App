import { User } from './User';

export class TagValidation {
  user: User;
  comment: String;

  constructor(user: User, comment: String) {
    this.user = user;
    this.comment = comment;
  }
}
