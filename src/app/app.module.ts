import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { NFC } from '@ionic-native/nfc/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersistenceService } from './services/persistence.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dhbw-experts.eu.auth0.com',
      clientId: 'XLYPvlQsSiVxy178YXv3NoYEAruXHn3I',
      redirectUri: 'http://localhost:4200/tabs/profile', //TODO pls help??
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NFC,
    PersistenceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
