import { Tag } from './tag';
import { NfcScan } from './nfc-scan';

export class User {
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
