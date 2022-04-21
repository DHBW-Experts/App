import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { User } from 'src/app/models/user';
import { PersistenceService } from 'src/app/services/persistence.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  static user: User; // this is the global user object
  email: String;
  password: String;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private persistence: PersistenceService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      // evtl. Validation der Inputs aufsetzen
    });

    this.persistence.local.getEmail()
      .then((result) => (this.email = result));
  }

  /**
   * Hier kommt die Login-Logik rein
   */

  async login() {
    if (
      this.email == null ||
      this.password == null ||
      this.email == '' ||
      this.password == ''
    ) {
      const alert = await alertController.create({
        header: 'Fehler',
        message: 'Daten nicht vollständig',
        buttons: ['Ok'],
      });
      await alert.present();
    } else {
      this.persistence.user.getByEmail(this.email).then(async (result) => {
        if (!result.userId) {
          const alert = await alertController.create({
            header: 'Fehler',
            message: 'Ungültige Anmeldedaten',
            buttons: ['Ok'],
          });
          await alert.present();
          return;
        }
        LoginPage.user = result;
        this.persistence.local.setEmail(result.email.toString());
        this.router.navigate(['../tabs/profile']);
      });
    }
  }

  openRegisterPage() {
    this.router.navigate(['../register']);
  }
}
