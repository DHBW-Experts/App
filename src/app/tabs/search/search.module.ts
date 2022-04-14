import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { SearchPageRoutingModule } from './search-routing.module';
import { ContactPreviewComponent } from '../contact-preview/contact-preview.component';
import { TagPreviewComponent } from '../tag-preview/tag-preview.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SearchPageRoutingModule,
  ],
  declarations: [SearchPage, ContactPreviewComponent, TagPreviewComponent],
})
export class SearchPageModule {}
