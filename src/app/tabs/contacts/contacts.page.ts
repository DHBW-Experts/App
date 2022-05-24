import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  constructor(
    private route: Router,
    private persistence: PersistenceService,
    private userState: UserStateService
  ) {}

  ngOnInit() {}

  openForeignProfile(userId) {
    this.route.navigate(['/tabs/contacts/profile'], { queryParams: { id: userId }});
  }
}
