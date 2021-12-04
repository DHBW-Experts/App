import { Tag } from './Tag';
import { NfcScan } from './NfcScan';
export class User {
  firstname: String;
  lastname: String;
  city: String;
  email: String;
  course: String;
  courseAbr: String;
  contacts: Array<User>;
  dhbw: String;
  skills: Array<Tag>;
  bio: String;
  profilePicutre: HTMLImageElement;
  rfidid: number;
  userId: number;
  isVerified: boolean;
  tmsCreated: String;

  createSkillTag(tagText: String) {
    this.skills.push(new Tag(tagText));
  }
  deleteSkillTag(index: number) {
    this.skills.splice(index, 1);
  }

  addContact(user: User) {}

  deleteContact(user: User) {}

  verify(id: number) {}

  getID(scan: NfcScan) {} //? doesnt really make sense, but ok
}
