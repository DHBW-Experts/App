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
  specialization: String;
  pwhash: String;

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

  constructor(
    firstname: String,
    lastname: String,
    dhbw: String,
    course: String,
    specialization: String,
    courseAbr: String,
    pwhash: String,
    email: String,

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
    this.firstname = firstname;
    this.lastname = lastname;
    this.city = city;
    this.email = email;
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
