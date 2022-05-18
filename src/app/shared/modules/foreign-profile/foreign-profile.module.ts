import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForeignProfilePageRoutingModule } from './foreign-profile-routing.module';
import { ForeignProfilePage } from './foreign-profile.page';
import {TagModule} from '../../components/tag/tag.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForeignProfilePageRoutingModule,
    TagModule
  ],
  declarations: [ForeignProfilePage],
})
export class ForeignProfilePageModule {}
