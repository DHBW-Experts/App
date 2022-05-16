import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfilePreviewComponent} from './profile-preview.component';



@NgModule({
  declarations: [ProfilePreviewComponent],
  imports: [CommonModule],
  exports: [ProfilePreviewComponent]
})
export class ProfilePreviewModule { }
