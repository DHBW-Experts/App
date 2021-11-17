import { Component } from '@angular/core';
import { NFC, NfcTag } from '@ionic-native/nfc/ngx'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss']
})
export class ScanPage {
  private nfcSub: Subscription;

  constructor(private nfc: NFC) {}

  ionViewDidEnter() {
    // Subscribe NFC reader
    const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.nfcSub = this.nfc.readerMode(flags).subscribe(this.nfcTagHandler, this.nfcErrHandler);
  }

  ionViewDidLeave() {
    // Unsubscribe NFC reader
    this.nfcSub.unsubscribe();
  }

  nfcTagHandler(tag: NfcTag) {
    // Prettify tag id
    const tagId = tag.id.map(i => Math.abs(i).toString(16).toUpperCase().padStart(2, '0')).join(':');

    console.log(`NFC: ${tagId}`);

    // TODO: redirect to profile page
  }

  nfcErrHandler(err: any) {
    console.log('Error reading tag', err);

    // TODO: show error in UI
  }
}
