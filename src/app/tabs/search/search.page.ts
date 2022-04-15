import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persistence } from 'src/app/models/persistence';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  constructor(private route: Router) {}
  searchText;
  resultsUser: User[];
  resultTags: Tag[];
  search() {
    if (this.searchText.length > 0) {
      const persistence = new Persistence();
      const userListPromise = persistence.getUsersByTag(this.searchText);
      userListPromise.then((result) => {
        this.resultsUser = result;
      });
    } else {
      this.resultsUser = [];
      this.resultTags = [];
    }
  }
  onTextChange() {
    if (this.searchText.length > 0) {
      const persistence = new Persistence();
      const tagListPromise = persistence.getDistinctTagsByText(this.searchText);
      tagListPromise.then((result) => {
        this.resultTags = result;
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
