import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NFC, NfcTag } from '@ionic-native/nfc/ngx';
import { alertController } from '@ionic/core';
import { Subscription } from 'rxjs';
import { PersistenceService } from 'src/app/services/persistence.service';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss'],
})
export class ScanPage {
  private nfcSub: Subscription;

  constructor(
    private nfc: NFC,
    private route: Router,
    private persistence: PersistenceService,
  ) { }

  ionViewDidEnter() {
    // Subscribe NFC reader
    const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;

    this.nfcSub = this.nfc.readerMode(flags).subscribe(tag => {
      // Prettify tag id
      const tagId = tag.id
        .map((i) => Math.abs(i).toString(16).toUpperCase().padStart(2, '0'))
        .join(':');

      console.log(`NFC: ${tagId}`);

      this.persistence.user.getByRfid(tagId).then(async user => {
        if (!user.userId) {
          const alert = await alertController.create({
            header: 'Fehler',
            message: 'Nutzer nicht gefunden',
            buttons: ['Ok'],
          });

          await alert.present();
        
          return;
        }

        this.route.navigate(['../view-foreign-profile', { id: user.userId }]);
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
  
    this.persistence.user.getByRfid('TEST-RFID-ID-0815').then(user => {
      this.route.navigate(['../view-foreign-profile', { id: user.userId }]); //Problem: cant acces router due to "this". solution: arrow func. (see nfc.readerMode(flags).subscribe)
    });
  }

  nfcErrHandler(err: any) {
    console.log('Error reading tag', err);
    // TODO: show error in UI
  }
}
