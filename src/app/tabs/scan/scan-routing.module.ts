import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanPage } from './scan.page';

const routes: Routes = [
  {
    path: '',
    component: ScanPage,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../../shared/modules/foreign-profile/foreign-profile.module').then(
        (m) => m.ForeignProfilePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanPageRoutingModule {}
