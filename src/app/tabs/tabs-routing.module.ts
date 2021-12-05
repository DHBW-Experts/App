import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'scan',
        loadChildren: () => import('./scan/scan.module').then(m => m.ScanPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      }, {
        path: 'contacts',
        loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/scan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/scan',
    pathMatch: 'full'
  },  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'view-foreign-profile',
    loadChildren: () => import('./view-foreign-profile/view-foreign-profile.module').then( m => m.ViewForeignProfilePageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
