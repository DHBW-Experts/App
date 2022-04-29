import { Tag } from './tag';
import { NfcScan } from './nfc-scan';

export class User {
  constructor(
    public firstName?: String,
    public lastName?: String,
    public dhbw?: String,
    public course?: String,
    public specialization?: String,
    public courseAbr?: String,
    public pwhash?: String,
    public emailprefix?: String,
    public email?: String,

    public city?: String,
    public biography?: String,
    public contacts?: Array<User>,
    public skills?: Array<Tag>,
    public profilePicutre?: HTMLImageElement,
    public rfidid?: String,
    public userId?: number,
    public isVerified?: boolean,
    public tmsCreated?: String
  ) {}
}
