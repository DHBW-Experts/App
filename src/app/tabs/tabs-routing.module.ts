import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'scan',
        loadChildren: () =>
          import('./scan/scan.module').then((m) => m.ScanPageModule),
          pathMatch: 'full',
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchPageModule)
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./contacts/contacts.module').then((m) => m.ContactsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
