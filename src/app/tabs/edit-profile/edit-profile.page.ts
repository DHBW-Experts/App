import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
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

  constructor(private router: Router) {
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
  edit() {
    //todo change password has to be checked
    this.persistence.editUser(this.user);
    LoginPage.user = this.user;
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
            this.persistence.deleteUser(this.user.userId);
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  backToProfilePage() {
    this.router.navigate(['tabs/profile']);
  }
}
