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
    public userId?: string,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public dhbwLocation?: string,
    public courseAbbr?: string,
    public course?: string,
    public specialization?: string,
    public city?: string,
    public biography?: string,
    public registered?: boolean,
    public createdAt?: string,
    
    public rfidId?: string,

    public contacts?: User[],
    public skills?: Tag[],
  ) {}
}
