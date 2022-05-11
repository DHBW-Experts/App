import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ExploreContainerComponentModule } from '../../shared/components/explore-container/explore-container.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import {TagModule} from '../../shared/components/tag/tag.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }]),
    ProfilePageRoutingModule,
    TagModule
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
