import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from 'src/app/shared/models/tag';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() public tag: Tag;
  @Input() public selected: Tag;

  @Output() tagSelected = new EventEmitter<any>();

  public tagValidationCount: number;

  constructor(
    private persistence: PersistenceService,
  ) {}

  ngOnInit() {
    this.persistence.tag.getValidations(this.tag.tagId).then(validations => {
      this.tagValidationCount = validations.length;
    });
  }
}
