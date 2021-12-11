import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from 'src/app/auth/login/login.page';
import { Persistence } from 'src/app/models/Persistence';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';

import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { TagComponent } from 'src/app/tag/tag.component';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isDataAvailable: boolean = false;
  tags: Tag[];
  user: User = null;
  ngOnInit(): void {
    const persistence = new Persistence();
    const userPromise = persistence.getUserById(LoginPage.user.userId);
    userPromise.then((result) => {
      this.user = result;
      this.isDataAvailable = true;
    });
    const tagPromise = persistence.getTags(LoginPage.user);

    tagPromise.then((result) => {
      this.tags = result;
    });
  }

  constructor(private route: Router) {}

  openEditPage() {
    this.route.navigate(['../edit-profile']); //TODO doesnt call ngOnInit, profile details wont load
  }
  addTag() {
    const persistence = new Persistence();
    persistence.addTag(this.user, 'Tagtext');
    console.log('added tag');
  }
}
