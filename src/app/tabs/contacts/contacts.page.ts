import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from 'src/app/auth/login/login.page';
import { User } from 'src/app/models/user';
import { PersistenceService } from 'src/app/services/persistence/persistence.service';
import { UserStateService } from 'src/app/services/user-state/user-state.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: User[];
  
  constructor(
    private route: Router,
    private persistence: PersistenceService,
    private userState: UserStateService
  ) {}
  
  ngOnInit() {}

  ionViewWillEnter() {
    this.persistence.contact.getByUserId(this.userState.userId)
      .then(contacts => this.contacts = contacts);
  }
  
  openForeignProfile(userId) {
    this.route.navigate(['../view-foreign-profile', { id: userId }]);
  }
}
