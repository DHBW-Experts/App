import { Component, OnInit } from '@angular/core';
import { bindNodeCallback } from 'rxjs';
import { LoginPage } from 'src/app/auth/login/login.page';
import { Persistence } from 'src/app/models/persistence';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  constructor() {
    this.ngOnInit();
  }
  isDataAvailable: boolean = false;
  user: User = null;
  private persistence = new Persistence();
  ngOnInit(): void {
    const userPromise = this.persistence.getUserById(LoginPage.user.userId);
    userPromise.then((result) => {
      this.user = result;
      this.isDataAvailable = true;
    });
  }
  password: String;
  password_wdh: String;
  password_old: String;
  edit() {
    //change password has to be checked
    this.persistence.editUser(this.user);
    LoginPage.user = this.user;
  }
}
