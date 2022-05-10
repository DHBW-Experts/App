import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth0ClientService, AuthService } from '@auth0/auth0-angular';
import { alertController } from '@ionic/core';
import { User } from 'src/app/shared/models/user';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';

import { mergeMap, tap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';
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
    if(this.userState.auth0User !== null && this.userState.isAuthenticated$.getValue()){
      this.loginSucceeded();
    } else {
      this.authSub = this.userState.isUserInfoAvailable$.subscribe( val => {
        if(val) this.loginSucceeded();
      });
    }
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  loginSucceeded() {
    if(this.userState.user.registered){
      this.router.navigate(["/tabs/profile"]);
    } else {
      console.log("info? "+ this.userState.isUserInfoAvailable$.getValue());
      console.log("regi? " + this.userState.user.registered);
      console.log("redir register");
      this.router.navigate(["/register"]);
    }
  }

  async login() {
    this.auth
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe();
  }
}
