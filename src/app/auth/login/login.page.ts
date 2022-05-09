import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth0ClientService, AuthService } from '@auth0/auth0-angular';
import { alertController } from '@ionic/core';
import { User } from 'src/app/models/user';
import { PersistenceService } from 'src/app/services/persistence/persistence.service';

import { mergeMap, tap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { UserStateService } from 'src/app/services/user-state/user-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy{
  form: FormGroup;
  static user: User; // this is the global user object
  email: String;
  password: String;

  authSub: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private userState: UserStateService
  ) {}

  ngOnInit(): void {
    if(this.userState.isAuthenticated$.getValue()){
      this.loginSucceeded();
    } else {
      this.authSub = this.auth.isAuthenticated$.subscribe( val => {
        if(val) this.loginSucceeded();
      });
    }
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  loginSucceeded() {
    this.router.navigate(["/tabs/profile"]);
  }

  async login() {
    this.auth
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe();
  }
}
