import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginPage } from '../../auth/login/login.page';
import { Persistence } from '../../models/persistence';
import { Tag } from '../../models/tag';
import { alertController } from '@ionic/core';
import { User } from '../../models/user';

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

  constructor(private route: Router) {
    const persistence = new Persistence();
    const userPromise = persistence.getUserById(LoginPage.user.userId);
    userPromise.then((result) => {
      this.user = result;
      this.isDataAvailable = true;
    });
        const tagPromise = persistence.getTags(LoginPage.user.userId);

    tagPromise.then((result) => {
      this.tags = result;
    });
  }
  ngOnInit(): void {}

  openEditPage() {
    this.route.navigate(['../edit-profile']);
  }
  tagClicked(e) {
    console.log(e);
    e.className = 'another-class';
  }

  async addTag() {
    const persistence = new Persistence();
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
            persistence.addTag(this.user, alertData.tagText).then(() => {
              const tagPromise2 = persistence.getTags(LoginPage.user.userId);
              tagPromise2.then((result) => {
                this.tags = result;
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
    let persistence = new Persistence();
    const tagValidationsPromise = persistence.getTagValidation(tag.tagId);
    tagValidationsPromise.then((result) => {
      this.tagValidations = result.map((validation) => validation.comment);
    });
  }
  async deleteTag() {
    const persistence = new Persistence();
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
            persistence.deleteTag(this.currentSelectedTag.tagId);
            //todo: not async
            const tagPromise2 = persistence.getTags(LoginPage.user.userId);
            tagPromise2.then((result) => {
              this.tags = result;
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
