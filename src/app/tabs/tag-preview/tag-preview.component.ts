import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-tag-preview',
  templateUrl: './tag-preview.component.html',
  styleUrls: ['./tag-preview.component.scss'],
})
export class TagPreviewComponent implements OnInit {
  @Input() tag: Tag;
  constructor() {}

  ngOnInit() {}
}
