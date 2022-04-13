import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Persistence } from 'src/app/models/persistence';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() public tag: Tag;
  @Input() public selected: Tag;
  tagValidationCount;
  @Output() tagSelected = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    const persistence = new Persistence();
    const ValPromise = persistence.getTagValidation(this.tag.tagId);
    ValPromise.then((result) => (this.tagValidationCount = result.length));
  }
}
