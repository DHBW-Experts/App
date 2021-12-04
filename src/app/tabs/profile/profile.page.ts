import { Component, OnInit } from '@angular/core';
import { Persistence } from 'src/app/models/Persistence';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor() {}
  isDataAvailable: boolean = false;

  user = null;
  ngOnInit(): void {
    const persistence = new Persistence();
    const userPromise = persistence.getUserById(1037); //TODO remove hardcoded userID
    userPromise.then((result) => {
      this.user = result;

      this.isDataAvailable = true;
    });
  }
}
