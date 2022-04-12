import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from 'src/app/auth/login/login.page';
import { Persistence } from 'src/app/models/Persistence';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  constructor(private route: Router) {}
  contacts: User[];
  ngOnInit() {}
  ionViewWillEnter() {
    const persistence = new Persistence();
    const contactsPromise = persistence.getContactsByUserId(
      LoginPage.user.userId
    );
    contactsPromise.then((result) => (this.contacts = result));
  }
  openForeignProfile(userId) {
    this.route.navigate(['../view-foreign-profile', { id: userId }]);
  }
}
