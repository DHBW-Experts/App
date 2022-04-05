import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewForeignProfilePage } from './view-foreign-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ViewForeignProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewForeignProfilePageRoutingModule {}
