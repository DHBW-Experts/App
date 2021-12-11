import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() public tag: any;
  constructor() {}

  ngOnInit() {}
}
