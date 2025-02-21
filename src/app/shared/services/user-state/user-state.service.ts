import { Injectable } from '@angular/core';
import { AuthService, User as Auth0User } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Tag } from 'src/app/shared/models/tag';
import { User } from 'src/app/shared/models/user';
import { PersistenceService } from '../persistence/persistence.service';
import { alertController } from '@ionic/core';
import { Browser } from '@capacitor/browser';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserStateService{

  auth0User: Auth0User;
  user: User;
  tags: Tag[];
  tagValidations = [];
  contacts: User [];
  userId: string;
  isAuthenticated$: BehaviorSubject<boolean>;
  isUserInfoAvailable$: BehaviorSubject<boolean>;

  constructor(private auth: AuthService, private persistence: PersistenceService,private route:Router, private loadingController: LoadingController) {
    this.auth0User = null;
    this.userId = null;
    this.isAuthenticated$ = new BehaviorSubject(false);
    this.isUserInfoAvailable$ = new BehaviorSubject(false);
    this.auth.isAuthenticated$.subscribe(this.isAuthenticated$);
    this.auth.error$.subscribe((error) => this.handleAuthError(error));

    this.auth.user$.subscribe( val => {
      this.auth0User = val;
      if(val !== null){
        this.userId = val.sub.split('|')[1];
        this.fetchUserInfo();
      } else {
        this.userId = null;
      }
    });
  }

  async handleAuthError(error: Error): Promise<void> {
    console.log(error.message);
    if(error.message === 'user_not_verified'){
      const alert = await alertController.create({
        header: 'Ein letzter Schritt...',
        message: 'Bitte verfiziere deine Email-Adresse',
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.logout();
          },
        }],
      });
      await alert.present();
    } else {
      console.log('logging out...');
      this.logout();
    }
  }

  public async fetchUserInfo(): Promise<void> {
    this.isUserInfoAvailable$.next(false);
    const loading = await this.loadingController.create({
      message: 'Lädt...'
    });
    await loading.present();
    return Promise.all([
      this.persistence.user.getById(this.userId).then( val => this.user = val),
      this.persistence.tag.getByUser(this.userId).then( val => this.tags = val),
      this.persistence.contact.getByUserId(this.userId).then(val => this.contacts = val)
    ]).then(() => {
      this.isUserInfoAvailable$.next(true);
      loading.dismiss();
    });
  }

  public async logout(){
    const loading = await this.loadingController.create({
      message: 'Lädt...'
    });
    await loading.present();
    this.user = null;
    this.auth0User = null;
    this.userId = "not signed in"
    this.tags = [];
    this.contacts = []
    this.tagValidations = [];
    this.auth
      .buildLogoutUrl({ returnTo : env.auth0_callbackURI })
      .pipe(
        tap((url) => {
          // Call the logout fuction, but only log out locally
          this.auth.logout({ localOnly: true });
          // Redirect to Auth0 using the Browser plugin, to clear the user's session
          Browser.open({ url, windowName: '_self' });
        })
      )
      .subscribe();
      this.route.navigate(['/']);
      loading.dismiss();
  }

}

