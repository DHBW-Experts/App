import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthHttpInterceptor, AuthConfig, AuthModule, AuthState } from '@auth0/auth0-angular';
import { domain, clientId, callbackUri } from './auth.config';
import { NFC } from '@ionic-native/nfc/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersistenceService } from './shared/services/persistence/persistence.service';
import { UserStateService } from './shared/services/user-state/user-state.service';

const config: AuthConfig = {
  domain,
  clientId,
  redirectUri: callbackUri,
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
    NFC,
    PersistenceService,
    UserStateService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
