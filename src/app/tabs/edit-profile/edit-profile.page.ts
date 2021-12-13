import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from '../../auth/login/login.page';
import { Persistence } from '../../models/persistence';

import { User } from '../../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  isDataAvailable: boolean = false;
  user: User = null;

  constructor(private router: Router) {
    const persistence = new Persistence();
    const userPromise = persistence.getUserById(LoginPage.user.userId);
    userPromise.then((result) => {
      this.user = result;
      this.isDataAvailable = true;
    });
  }

  private persistence = new Persistence();
  ngOnInit(): void {}
  password: String;
  password_wdh: String;
  password_old: String;
  edit() {
    //change password has to be checked
    this.persistence.editUser(this.user);
    LoginPage.user = this.user;
  }

  backToProfilePage() {
    this.router.navigate(['tabs/profile']);
  }
}
