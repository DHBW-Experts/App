import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: User = null;
  buttonVisibility: string = 'hidden';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private persistence: PersistenceService,
    private userState: UserStateService
  ) {}

  ngOnInit(): void {
    this.user = this.userState.user;
  }

  async edit() {
    this.persistence.user.edit(this.user).then((code) => {
      if (!String(code).startsWith('2')) {
        this.presentChangesFailed();
      } else {
        this.userState.fetchUserInfo();
        this.backToProfilePage();
        this.presentChanged();
      }
    });
  }

  async detectChanges() {
    this.buttonVisibility = 'visible';
  }

  //ACHTUNG!!! FUNKTIONIERT MIT NEUER AUTH LÖSUNG NICHT!
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
            this.userState.logout();
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  backToProfilePage() {
    this.router.navigate(['/tabs/profile']);
  }

  async presentChanged() {
    const toast = await this.toastController.create({
      message:
        '<ion-icon name="checkmark-outline"></ion-icon>  Deine Änderungen wurden gespeichert.',
      position: 'top',
      color: 'success',
      duration: 800,
    });
    toast.present();
  }

  async presentChangesFailed() {
    const toast = await this.toastController.create({
      header: 'Etwas ist schiefgelaufen!',
      message:
        '\nDeine Änderungen konnten nicht gespeichert werden. Bitte warte einen Augenblick und versuche es erneut oder wende dich an unseren Support.',
      position: 'top',
      color: 'danger',
      duration: 3200,
    });
    toast.present();
  }
}
