import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationBuilder, ToastController } from '@ionic/angular';
import { LoginPage } from '../../auth/login/login.page';
import { Persistence } from '../../models/persistence';

import { User } from '../../models/user';

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
    this.persistence.editUser(this.user);
    LoginPage.user = this.user;
    this.backToProfilePage();
    this.presentChanged();
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
}
