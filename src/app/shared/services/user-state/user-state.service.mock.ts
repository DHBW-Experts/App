import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User as Auth0User } from '@auth0/auth0-angular';
import { LoadingController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { BehaviorSubject } from 'rxjs';
import { Tag } from 'src/app/shared/models/tag';
import { User } from 'src/app/shared/models/user';
import { PersistenceService } from '../persistence/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateServiceStub {
  user: User;
  tags: Tag[];
  tagValidations = [];
  contacts: User[];
  userId: string;
  isAuthenticated$: BehaviorSubject<boolean>;
  isUserInfoAvailable$: BehaviorSubject<boolean>;

  constructor(
    private auth: AuthService,
    private persistence: PersistenceService,
    private route: Router,
    private loadingController: LoadingController
  ) {
    this.userId = 'a11a1a1a1';
    this.contacts = [
      {
        userId: '626db5fc4105f20069997435',
        firstname: 'Max',
        lastname: 'Mustermann',
        dhbwLocation: 'Karlsruhe',
        course: 'Informatik',
        courseAbbr: 'TINF20B2',
        specialization: 'Angewandte Informatik',
        email: 'mustermann.max@student.dhbw-karlsruhe.de',
        city: 'Ettlingen',
        biography: 'Hello World!!',
        registered: true,
        createdAt: '2022-04-24T21:37:07.183',
      },
    ];
    this.user = {
      userId: 'a11a1a1a1',
      firstname: 'MaxMock',
      lastname: 'Mustermann',
      dhbwLocation: 'Karlsruhe',
      course: 'Informatik',
      courseAbbr: 'TINF20B2',
      specialization: 'Angewandte Informatik',
      email: 'mustermann.max@student.dhbw-karlsruhe.de',
      city: 'Ettlingen',
      biography: 'Hello World!!',
    };
    this.isAuthenticated$ = new BehaviorSubject(true);
    this.isUserInfoAvailable$ = new BehaviorSubject(true);
    this.auth.isAuthenticated$.subscribe(this.isAuthenticated$);
    this.auth.error$.subscribe((error) => this.handleAuthError(error));

    this.auth.user$.subscribe((val) => {
      if (val !== null) {
        this.userId = val.sub.split('|')[1];
        this.fetchUserInfo();
      } else {
        this.userId = null;
      }
    });
  }

  async handleAuthError(error: Error): Promise<void> {
    console.log(error.message);
    if (error.message === 'user_not_verified') {
      const alert = await alertController.create({
        header: 'Ein letzter Schritt...',
        message: 'Bitte verfiziere deine Email-Adresse',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.logout();
            },
          },
        ],
      });
      await alert.present();
    } else {
      console.log('logging out...');
      this.logout();
    }
  }

  public fetchUserInfo(): Promise<void> {
    this.isUserInfoAvailable$.next(false);

    return Promise.all([
      this.persistence.user
        .getById(this.userId)
        .then((val) => (this.user = val)),
      this.persistence.tag
        .getByUser(this.userId)
        .then((val) => (this.tags = val)),
      this.persistence.contact
        .getByUserId(this.userId)
        .then((val) => (this.contacts = val)),
    ]).then(() => {
      this.isUserInfoAvailable$.next(true);
    });
  }

  public async logout() {}
}
