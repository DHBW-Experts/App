import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './shared/components/callback/callback.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./shared/modules/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./shared/modules/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./shared/modules/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
