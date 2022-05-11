import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { ProfilePreviewComponent } from '../../shared/components/profile-preview/profile-preview.component';
import {ProfilePreviewModule} from '../../shared/components/profile-preview/profile-preview.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ContactsPageRoutingModule, ProfilePreviewModule],
  declarations: [ContactsPage],
})
export class ContactsPageModule {}
