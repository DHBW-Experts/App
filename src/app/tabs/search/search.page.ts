import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';
import { PersistenceService } from 'src/app/services/persistence.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  
  constructor(
    private route: Router,
    private persistence: PersistenceService,
  ) { }
  
  searchText;
  resultsUser: User[];
  resultTags: Tag[];

  search() {
    if (this.searchText.length > 0) {
      this.persistence.user.getByTag(this.searchText).then(user => {
        this.resultsUser = user;
      });
    } else {
      this.resultsUser = [];
      this.resultTags = [];
    }
  }

  onTextChange() {
    if (this.searchText.length > 0) {
      this.persistence.tag.getDistinctByText(this.searchText).then(tags => {
        this.resultTags = tags;
      });
    } else {
      this.resultsUser = [];
      this.resultTags = [];
    }
  }

  onTagPreviewClick(tagText: string) {
    this.searchText = tagText;
    this.search();
  }

  openForeignProfile(userId) {
    this.route.navigate(['../view-foreign-profile', { id: userId }]);
  }
}
