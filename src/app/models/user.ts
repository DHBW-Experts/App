import { Tag } from './tag';
import { NfcScan } from './nfc-scan';

export class User {
  constructor(
    public firstname?: String,
    public lastname?: String,
    public dhbwLocation?: String,
    public course?: String,
    public specialization?: String,
    public courseAbbr?: String,
    public pwhash?: String,
    public emailprefix?: String,
    public email?: String,

    public city?: String,
    public biography?: String,
    public contacts?: Array<User>,
    public skills?: Array<Tag>,
    public rfidid?: String,
    public userId?: string,
    public isVerified?: boolean,
    public tmsCreated?: String
  ) {}
}
