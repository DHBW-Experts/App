import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationBuilder, ToastController } from '@ionic/angular';
import { LoginPage } from '../../auth/login/login.page';
import { Persistence } from '../../models/persistence';

import { User } from '../../models/user';
const API_BASE = 'https://dhbw-experts-api.azurewebsites.net';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  isDataAvailable: boolean = false;
  user: User = null;

  constructor(private router: Router, private alertCtrl: AlertController, public toastController: ToastController) {
    const persistence = new Persistence();
    const userPromise = persistence.getUserById(LoginPage.user.userId);
    userPromise.then((result) => {
      this.user = result;
      this.isDataAvailable = true;
    });
  }

  private persistence = new Persistence();
  ngOnInit(): void {}
  password: String;
  password_wdh: String;
  password_old: String;
  async edit() {
    if (this.password !== this.password_wdh) {
      let alert = await this.alertCtrl.create({
        header: 'Fehler',
        message: 'Die Passwörter stimmen nicht überein!',
        buttons: ['Ok'],
      });
      alert.present();
      return;
    }
    const response = this.persistence.editUser(this.user);
    response.then((result) => {
      if(!String(result).startsWith('2')){
          this.presentChangesFailed();
      } else {
          LoginPage.user = this.user;
          this.backToProfilePage();
          this.presentChanged();
      }
    })
        
    
  }

  backToProfilePage() {
    this.router.navigate(['tabs/profile']);
  }

  async presentChanged() {
    const toast = await this.toastController.create({
      message: '<ion-icon name="checkmark-outline"></ion-icon>  Deine Änderungen wurden gespeichert.',
      position: 'top',
      color: 'success',
      duration: 800
    });
    toast.present();
  }

  async presentChangesFailed() {
    const toast = await this.toastController.create({
      header: 'Etwas ist schiefgelaufen!',
      message: '\nDeine Änderungen konnten nicht gespeichert werden. Bitte warte einen Augenblick und versuche es erneut oder wende dich an unseren Support.',
      position: 'top',
      color: 'danger',
      duration: 3200
    });
    toast.present();
  }
}
