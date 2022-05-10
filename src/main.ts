import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LoginPage } from './app/shared/modules/login/login.page';
import { User } from './app/shared/models/user';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
LoginPage.user = new User();
LoginPage.user.userId = '626db6676c48dc006a2dcb17'; //"default user" TODO: remove for prod :)

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
