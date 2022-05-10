import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'scan',
        loadChildren: () =>
          import('./scan/scan.module').then((m) => m.ScanPageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./contacts/contacts.module').then(
            (m) => m.ContactsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./profile/edit-profile/edit-profile.module').then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-foreign-profile',
    loadChildren: () =>
      import('../shared/modules/view-foreign-profile/view-foreign-profile.module').then(
        (m) => m.ViewForeignProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
