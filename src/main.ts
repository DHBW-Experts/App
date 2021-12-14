import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LoginPage } from './app/auth/login/login.page';
import { Persistence } from './app/models/Persistence';
import { User } from './app/models/user';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
LoginPage.user = new User();
const persistence = new Persistence();
let idPromise = persistence.getUserIdFromLocalStorage();
idPromise.then((res) => (LoginPage.user.userId = res));

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
