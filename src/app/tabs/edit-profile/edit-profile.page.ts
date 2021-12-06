import { Component, OnInit } from '@angular/core';
import { bindNodeCallback } from 'rxjs';
import { Persistence } from 'src/app/models/Persistence';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  constructor() {}
  isDataAvailable: boolean = false;
  user: User = null;
  private persistence = new Persistence();
  ngOnInit(): void {
    const userPromise = this.persistence.getUserById(1037); //TODO remove hardcoded userID
    userPromise.then((result) => {
      this.user = result;
      this.isDataAvailable = true;
    });
  }
  bio: String;
  course: String;
  specialization: String;
  courseAbr: String;
  password: String;
  password_wdh: String;
  password_old: String;
  edit() {
    this.user.bio = this.bio;
    this.user.course = this.course;
    this.user.specialization = this.specialization;
    this.user.courseAbr = this.courseAbr;
    //change password has to be checked
    //this.persistence.editUser(user); API Endpoint missing todo, post data has to be adapted accordingly
  }
}
