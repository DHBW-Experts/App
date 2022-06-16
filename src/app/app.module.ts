import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthHttpInterceptor, AuthConfig, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { NFC } from '@ionic-native/nfc/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersistenceService } from './shared/services/persistence/persistence.service';
import { UserStateService } from './shared/services/user-state/user-state.service';

const config: AuthConfig = {
  domain: env.auth0_domain,
  clientId: env.auth0_clientId,
  redirectUri: env.auth0_callbackURI,
  audience: 'https://dhbw-experts-api.azurewebsites.net/',
  scope: 'read:profile write:profile ',
  httpInterceptor: {
    allowedList: [
      {
        uri: `${env.api_domain}/*`,
        tokenOptions: {
          audience: 'https://dhbw-experts-api.azurewebsites.net/',
          scope: 'read:profile write:profile',
        }
      }
    ]
  }

  /* Uncomment the following lines for better support  in browers like Safari where third-party cookies are blocked.
    See https://auth0.com/docs/libraries/auth0-single-page-app-sdk#change-storage-options for risks.
  */
  // cacheLocation: "localstorage",
  // useRefreshTokens: true
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(config),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    NFC,
    PersistenceService,
    UserStateService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
