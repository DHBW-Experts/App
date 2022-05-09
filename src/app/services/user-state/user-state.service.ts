import { Injectable } from '@angular/core';
import { AuthService, User as Auth0User } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { LoginPage } from 'src/app/auth/login/login.page';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';
import { PersistenceService } from '../persistence/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService{

  auth0User: Auth0User;
  user: User;
  tags: Tag[];
  tagValidations = [];
  userId: string;
  isAuthenticated$: BehaviorSubject<boolean>;
  isUserInfoAvailable$: BehaviorSubject<boolean>;

  constructor(private auth: AuthService, private persistence: PersistenceService,) {
    this.auth0User = null;
    this.userId = "not signed in";
    this.isAuthenticated$ = new BehaviorSubject(false);
    this.isUserInfoAvailable$ = new BehaviorSubject(false);
    this.auth.isAuthenticated$.subscribe(this.isAuthenticated$);

    this.auth.user$.subscribe( val => {
      this.auth0User = val;
      if(val !== null){
        this.userId = val.sub.split('|')[1];
        this.fetchUserInfo();
      } else {
        this.userId = "not signed in"
      }
    });
  }

  private fetchUserInfo(){
    this.isUserInfoAvailable$.next(false);

    Promise.all([
      this.persistence.user.getById(this.userId).then( val => this.user = val),
      this.persistence.tag.getByUser(this.userId).then( val => this.tags = val),
    ]).then(() => {
      this.isUserInfoAvailable$.next(true);
    });
  }
}

