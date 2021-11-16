import { Component } from '@angular/core';
import { NFC, NfcTag } from '@ionic-native/nfc/ngx'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss']
})
export class ScanPage {
  private sub: Subscription;

  constructor(private nfc: NFC) {}

  ionViewDidEnter() {
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.sub = this.nfc.readerMode(flags).subscribe(this.nfcTagHandler, this.nfcErrHandler);
  }

  nfcTagHandler(tag: NfcTag) {
    const tagId = tag.id;
    console.log(`NFC: ${tagId}`);
  }

  nfcErrHandler(err: any) {
    console.log('Error reading tag', err);
  }
}
