import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() tag: Tag;
  constructor() {
    console.log('test');
  }

  ngOnInit() {}
}
