import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persistence } from 'src/app/models/Persistence';
import { User } from 'src/app/models/User';

import { EditProfilePage } from '../edit-profile/edit-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isDataAvailable: boolean = false;

  user: User = null;
  ngOnInit(): void {
    const persistence = new Persistence();
    const userPromise = persistence.getUserById(1037); //TODO remove hardcoded userID
    userPromise.then((result) => {
      this.user = result;

      this.isDataAvailable = true;
    });
  }

  constructor(private route: Router) {}

  openEditPage() {
    this.route.navigate(['../edit-profile']); //doesnt call ngOnInit
  }
  addTag() {
    console.log('implement me');
  }
}
