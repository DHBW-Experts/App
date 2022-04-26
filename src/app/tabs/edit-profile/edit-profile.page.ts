import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { PersistenceService } from 'src/app/services/persistence.service';
import { LoginPage } from '../../auth/login/login.page';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  isDataAvailable: boolean = false;
  user: User = null;

  password: String;
  password_wdh: String;
  password_old: String;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private persistence: PersistenceService,
  ) {
    this.persistence.user.getById(LoginPage.user.userId).then(user => {
      this.user = user;
      this.isDataAvailable = true;
    });
  }

  ngOnInit(): void {}

  async edit() {
    if (this.password !== this.password_wdh) {
      let alert = await this.alertCtrl.create({
        header: 'Fehler',
        message: 'Die Passwörter stimmen nicht überein!',
        buttons: ['Ok'],
      });
      alert.present();
      
      this.password = '';
      this.password_wdh = '';
      
      return;
    }

    this.persistence.user.edit(this.user).then(code => {
      if(!String(code).startsWith('2')){
        this.presentChangesFailed();
      } else {
        LoginPage.user = this.user;
        this.backToProfilePage();
        this.presentChanged();
      }
    })
  }

  // (change) or (ngModelChange) both do the same, change can be applied to the div and so the whole page.
  // With both ways, its working/setting the visibility, but its not becoming visible
  async detectChanges() {
    document.getElementById('bottom-nav').setAttribute('visibility', 'visible');
  }

  async delete() {
    const alert = await alertController.create({
      header: 'Achtung',
      message: 'Dein Profil wird endgültig gelöscht. Bist du sicher? ',
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
            this.persistence.user.delete(this.user.userId);
            this.router.navigate(['/login']);
            
            LoginPage.user = null;
          },
        },
      ],
    });
    await alert.present();
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
