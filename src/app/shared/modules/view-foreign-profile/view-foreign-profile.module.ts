import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewForeignProfilePageRoutingModule } from './view-foreign-profile-routing.module';

import { ViewForeignProfilePage } from './view-foreign-profile.page';
import { TagComponent } from '../../components/tag/tag.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewForeignProfilePageRoutingModule,
  ],
  declarations: [ViewForeignProfilePage, TagComponent],
})
export class ViewForeignProfilePageModule {}
