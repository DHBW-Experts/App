import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForeignProfilePage } from './foreign-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ForeignProfilePage,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForeignProfilePageRoutingModule {}
