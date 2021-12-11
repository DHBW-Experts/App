import { Tag } from './tag';
import { NfcScan } from './nfc-scan';

export class User {
  firstName: String;
  lastName: String;
  city: String;
  emailprefix: String;
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
  specialization: String;
  pwhash: String;

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
    firstname?: String,
    lastname?: String,
    dhbw?: String,
    course?: String,
    specialization?: String,
    courseAbr?: String,
    pwhash?: String,
    emailprefix?: String,

    city?: String,
    bio?: String,
    contacts?: Array<User>,
    skills?: Array<Tag>,
    profilePicutre?: HTMLImageElement,
    rfidid?: number,
    userId?: number,
    isVerified?: boolean,
    tmsCreated?: String
  ) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.city = city;
    this.emailprefix = emailprefix;
    this.course = course;
    this.courseAbr = courseAbr;
    this.contacts = contacts;
    this.dhbw = dhbw;
    this.skills = skills;
    this.bio = bio;
    this.profilePicutre = profilePicutre;
    this.rfidid = rfidid;
    this.userId = userId;
    this.isVerified = isVerified;
    this.tmsCreated = tmsCreated;
    this.specialization = specialization;
    this.pwhash = pwhash;
  }
}
