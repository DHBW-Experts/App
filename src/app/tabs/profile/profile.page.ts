import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginPage } from '../../auth/login/login.page';
import { Persistence } from '../../models/persistence';
import { Tag } from '../../models/tag';

import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isDataAvailable: boolean = false;
  tags: Tag[];
  user: User = null;

  constructor(private route: Router) {
    const persistence = new Persistence();
    const userPromise = persistence.getUserById(LoginPage.user.userId);
    userPromise.then((result) => {
      this.user = result;
      this.isDataAvailable = true;
    });
    const tagPromise = persistence.getTags(LoginPage.user);

    tagPromise.then((result) => {
      this.tags = result;
    });
  }
  ngOnInit(): void {}

  openEditPage() {
    this.route.navigate(['../edit-profile']); //TODO doesnt call ngOnInit, profile details wont load
  }
  async addTag() {
    //TODO tag validation count cannot be displayed
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
            persistence.addTag(this.user, alertData.tagText);
          },
        },
      ],
    });
    await alert.present();
  }
}
