import { Tag } from './tag';
import { NfcScan } from './nfc-scan';

export class User {
  createSkillTag(tagText: String) {
    //this.skills.push(new Tag(tagText));
  }

  deleteSkillTag(index: number) {
    this.skills.splice(index, 1);
  }

  addContact(user: User) {}

  deleteContact(user: User) {}

  verify(id: number) {}

  getID(scan: NfcScan) {} //? doesnt really make sense, but ok

  constructor(
    public firstname?: String,
    public lastname?: String,
    public dhbw?: String,
    public course?: String,
    public specialization?: String,
    public courseAbr?: String,
    public pwhash?: String,
    public emailprefix?: String,
    public email?: String,

    public city?: String,
    public bio?: String,
    public contacts?: Array<User>,
    public skills?: Array<Tag>,
    public profilePicutre?: HTMLImageElement,
    public rfidid?: String,
    public userId?: number,
    public isVerified?: boolean,
    public tmsCreated?: String
  ) {}
}
