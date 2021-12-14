import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { Persistence } from 'src/app/models/Persistence';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      // evtl. Validation der Inputs aufsetzen
    });
  }

  /**
   * Hier kommt die Login-Logik rein
   */
  static user: User; // this is the global user object
  email: String;
  password: String;

  async login() {
    const persistence = new Persistence();
    if (this.email == null || this.password == null) {
      const alert = await alertController.create({
        header: 'Fehler',
        message: 'Daten nicht vollständig',
        buttons: ['Ok'],
      });
      await alert.present();
    } else {
      this.router.navigate(['../tabs/profile']);
      const userPromise = persistence.getUserByEmail(this.email);
      userPromise.then(async (result) => {
        LoginPage.user = result;
        persistence.saveUserIdToLocalStorage(LoginPage.user.userId);
      });
    }
  }

  openRegisterPage() {
    this.router.navigate(['../register']);
  }
}
