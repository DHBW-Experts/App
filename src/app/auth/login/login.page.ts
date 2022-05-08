import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { alertController } from '@ionic/core';
import { User } from 'src/app/models/user';
import { PersistenceService } from 'src/app/services/persistence.service';

import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';

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
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.login();
  }

  /**
   * Hier kommt die Login-Logik rein
   */

  async login() {
    this.auth
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe();
  }

  openRegisterPage() {
    this.router.navigate(['../register']);
  }
}
