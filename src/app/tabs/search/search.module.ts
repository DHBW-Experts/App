import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { ExploreContainerComponentModule } from '../../shared/components/explore-container/explore-container.module';

import { SearchPageRoutingModule } from './search-routing.module';
import { TagPreviewComponent } from '../../shared/components/tag-preview/tag-preview.component';
import {ProfilePreviewModule} from '../../shared/components/profile-preview/profile-preview.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SearchPageRoutingModule,
    ProfilePreviewModule,
  ],
  declarations: [SearchPage, TagPreviewComponent],
})
export class SearchPageModule {}
