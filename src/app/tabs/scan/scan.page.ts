import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NFC, NfcTag } from '@ionic-native/nfc/ngx';
import { alertController } from '@ionic/core';
import { Subscription } from 'rxjs';
import { Persistence } from 'src/app/models/persistence';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss'],
})
export class ScanPage {
  private nfcSub: Subscription;

  constructor(private nfc: NFC, private route: Router) {}

  ionViewDidEnter() {
    // Subscribe NFC reader
    const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.nfcSub = this.nfc.readerMode(flags).subscribe((tag) => {
      // Prettify tag id
      const tagId = tag.id
        .map((i) => Math.abs(i).toString(16).toUpperCase().padStart(2, '0'))
        .join(':');

      console.log(`NFC: ${tagId}`);
      const persistence = new Persistence();
      const userPromise = persistence.getUserByRFID(tagId);

      userPromise.then(async (result) => {
        if (!result.userId) {
          const alert = await alertController.create({
            header: 'Fehler',
            message: 'Nutzer nicht gefunden',
            buttons: ['Ok'],
          });
          await alert.present();
          return;
        }
        this.route.navigate(['../view-foreign-profile', { id: result.userId }]);
      });
    }, this.nfcErrHandler);
  }

  ionViewDidLeave() {
    // Unsubscribe NFC reader
    this.nfcSub.unsubscribe();
  }

  nfcTagHandler(tag: NfcTag) {
    // Prettify tag id
    const tagId = tag.id
      .map((i) => Math.abs(i).toString(16).toUpperCase().padStart(2, '0'))
      .join(':');

    console.log(`NFC: ${tagId}`);
    const persistence = new Persistence();
    const userPromise = persistence.getUserByRFID('TEST-RFID-ID-0815'); //tagID
    userPromise.then((result) => {
      this.route.navigate(['../view-foreign-profile', { id: result.userId }]); //Problem: cant acces router due to "this". solution: arrow func. (see nfc.readerMode(flags).subscribe)
    });
  }

  nfcErrHandler(err: any) {
    console.log('Error reading tag', err);
    // TODO: show error in UI
  }
}
