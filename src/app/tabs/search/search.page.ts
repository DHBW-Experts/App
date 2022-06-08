import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/shared/models/tag';
import { User } from 'src/app/shared/models/user';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  constructor(private route: Router, private persistence: PersistenceService) {}

  searchText;
  selectedOption = 'tag';
  resultsUser: User[];
  resultTags: Tag[];

  search() {
    if (this.searchText.length <= 0) {
      this.resultsUser = [];
      this.resultTags = [];
      return;
    }
    if (this.selectedOption === 'tag') {
      this.persistence.search
        .searchUsersByTag(this.searchText)
        .then((res) => (this.resultsUser = res));
    } else if (this.selectedOption === 'user') {
      this.persistence.search
        .searchUsersByName(this.searchText)
        .then((res) => (this.resultsUser = res));
    } else if (this.selectedOption === 'standort') {
      this.persistence.search
        .searchUsersByLocation(this.searchText)
        .then((res) => (this.resultsUser = res));
    } else if (this.selectedOption === 'kurs') {
      this.persistence.search
        .searchUsersByCourseAbbr(this.searchText)
        .then((res) => (this.resultsUser = res));
    } else if (this.selectedOption === 'studiengang') {
      this.persistence.search
        .searchUsersByCourse(this.searchText)
        .then((res) => (this.resultsUser = res));
    }
  }

  onTextChange() {
    if (this.selectedOption === 'tag') {
      if (this.searchText.length > 0) {
        this.persistence.search.searchTags(this.searchText).then((tags) => {
          this.resultTags = tags;
        });
      } else {
        this.resultTags = [];
      }
    } else {
      this.resultTags = [];
    }
  }

  onTagPreviewClick(tagText: string) {
    this.searchText = tagText;
    this.search();
  }

  openForeignProfile(userId) {
    this.route.navigate(['/tabs/search/profile'], {
      queryParams: { id: userId },
    });
  }
}
