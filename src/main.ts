import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LoginPage } from './app/auth/login/login.page';
import { User } from './app/models/user';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
LoginPage.user = new User();
LoginPage.user.userId = 1020;
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
