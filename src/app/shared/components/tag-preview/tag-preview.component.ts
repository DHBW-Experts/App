import { Component, Input } from '@angular/core';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tag-preview',
  templateUrl: './tag-preview.component.html',
  styleUrls: ['./tag-preview.component.scss'],
})
export class TagPreviewComponent {
  @Input() tag: Tag;
}
