import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { isPlatform } from '@ionic/angular';
import { mergeMap } from 'rxjs/operators';
import { environment as env} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private ngZone: NgZone) {}

  ngOnInit(): void {
    App.addListener('appUrlOpen', ({ url }) => {
      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular

      this.ngZone.run(() => {
        if (url?.startsWith(env.auth0_callbackURI)) {
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            this.auth
              .handleRedirectCallback(url)
              .pipe(
                mergeMap(() => {
                  if (isPlatform('ios') || isPlatform('android')) {
                    return Browser.close();
                  }
                  return Promise.resolve();
                })
              )
              .subscribe();
          } else {
            if (isPlatform('ios') || isPlatform('android')) {
              return Browser.close();
            }
          }
        }
      });
    });
  }
}
