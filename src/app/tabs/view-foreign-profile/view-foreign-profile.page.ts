import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-foreign-profile',
  templateUrl: './view-foreign-profile.page.html',
  styleUrls: ['./view-foreign-profile.page.scss'],
})
export class ViewForeignProfilePage implements OnInit {
  user: User;
  tags: Tag[];
  tagValidations = [];
  isDataAvailable: boolean = false;
  isTagSelected: boolean = false;
  selectedTag: Tag;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {}

  ionViewWillEnter() {
    const persistence = new Persistence();
    const userId = +this.route.snapshot.paramMap.get('id');
    const userPromise = persistence.getUserById(userId);
    userPromise.then((result) => {
      this.user = result;
      this.isDataAvailable = true;

  ngOnInit() {
  }
    });

    const tagPromise = persistence.getTags(userId);
    tagPromise.then((result) => {
      this.tags = result;
    });
  }

  tagSelected(tag: Tag) {
    this.isTagSelected = true;
    this.selectedTag = tag;
    let persistence = new Persistence();
    const tagValidationsPromise = persistence.getTagValidation(tag.tagId);
    tagValidationsPromise.then((result) => {
      this.tagValidations = result.map((validation) => validation.comment);
    });
  }
}
