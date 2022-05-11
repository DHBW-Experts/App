import { User } from './user';

export class TagValidation {
  user: User;
  comment: string;

  constructor(user: User, comment: string) {
    this.user = user;
    this.comment = comment;
  }
}
