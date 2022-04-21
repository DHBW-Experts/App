import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginPage } from '../../auth/login/login.page';
import { Tag } from '../../models/tag';
import { alertController } from '@ionic/core';
import { User } from '../../models/user';
import { NFC } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';
import { PersistenceService } from 'src/app/services/persistence.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isDataAvailable: boolean = false;
  tags: Tag[];
  tagValidations = [];
  user: User = null;
  isTagSelected = false;
  currentSelectedTag: Tag;

  private nfcSub: Subscription;

  constructor(
    private route: Router,
    private nfc: NFC,
    private persistence: PersistenceService,
  ) {
    this.route.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.persistence.user.getById(LoginPage.user.userId).then(user => {
          this.user = user;
          this.isDataAvailable = true;
        });

        this.persistence.tag.getByUser(LoginPage.user.userId).then(tags => {
          this.tags = tags;
        });
      }
    });
  }

  ngOnInit(): void {}

  openEditPage() {
    this.route.navigate(['../edit-profile']);
  }
  
  async addTag() {
    const alertController = new AlertController();
    const alert = await alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tagname eingeben',
      inputs: [
        {
          name: 'tagText',
          type: 'text',
          label: 'Radio 1',
          value: '',
          handler: () => {
            console.log('');
          },
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            this.persistence.tag.create(this.user, alertData.tagText).then(() => {
              this.persistence.tag.getByUser(LoginPage.user.userId).then(tags => {
                this.tags = tags;
              });
            });
          },
        },
      ],
    });
    await alert.present();
  }

  tagSelected(tag: Tag) {
    this.isTagSelected = true;
    this.currentSelectedTag = tag;

    this.persistence.tag.getValidations(tag.tagId).then(validations => {
      this.tagValidations = validations.map(validation => validation.comment);
    });
  }

  async deleteTag() {
    const alert = await alertController.create({
      header: 'Achtung',
      message:
        'Der Tag ' +
        this.currentSelectedTag.tag +
        ' wird gelöscht. Bist du sicher? ',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ja',
          handler: () => {
            this.persistence.tag.delete(this.currentSelectedTag.tagId).then(() => {
              this.persistence.tag.getByUser(LoginPage.user.userId).then(tags => {
                this.tags = tags;
              })
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async openScanPage() {
    const alert = await alertController.create({
      header: 'Information',
      message: 'Scanne nun deinen Ausweis',
      buttons: ['Ok'],
    });
    await alert.present();

    const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    
    this.nfcSub = this.nfc.readerMode(flags).subscribe((tag) => {
      const tagId = tag.id
        .map((i) => Math.abs(i).toString(16).toUpperCase().padStart(2, '0'))
        .join(':');
      
      const user = LoginPage.user;
      user.rfidid = tagId;
      
      this.persistence.user.edit(user);
    }, this.nfcErrHandler);
  }
  
  nfcErrHandler(err: any) {
    console.log('Error reading tag', err);
  }

  ionViewDidLeave() {
    // Unsubscribe NFC reader
    this.nfcSub.unsubscribe();
  }
}
