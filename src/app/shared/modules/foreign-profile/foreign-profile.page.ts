import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { alertController } from '@ionic/core';
import { LoginPage } from 'src/app/shared/modules/login/login.page';
import { Tag } from 'src/app/shared/models/tag';
import { User } from 'src/app/shared/models/user';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-foreign-profile',
  templateUrl: './foreign-profile.page.html',
  styleUrls: ['./foreign-profile.page.scss'],
})
export class ForeignProfilePage implements OnInit {
  user: User;
  tags: Tag[];
  tagValidations = [];
  isDataAvailable: boolean = false;
  isUserInContacts: boolean = false;
  contacts: User[];
  isUserLoggedInUser: boolean;
  isTagSelected: boolean = false;
  selectedTag: Tag;

  constructor(
    private route: ActivatedRoute,
    private persistence: PersistenceService,
    private userState: UserStateService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
    const userId = this.route.snapshot.queryParamMap.get('id');

    this.persistence.user.getById(userId).then((user) => {
      this.user = user;
      this.isDataAvailable = true;

      const contactsPromise = this.persistence.contact
        .getByUserId(this.userState.userId)
        .then((contacts) => {
          this.contacts = contacts;

          if (this.userState.userId === this.user.userId) {
            this.isUserLoggedInUser = true;
            return;
          }

          this.isUserInContacts = this.contacts.some(
            (e) => e.userId === this.user.userId
          );
        });
    });

    this.persistence.tag.getByUser(userId).then((tags) => {
      this.tags = tags;
    });
  }

  tagSelected(tag: Tag) {
    this.isTagSelected = true;
    this.selectedTag = tag;

    this.persistence.tag.getValidations(tag.tagId).then((validations) => {
      this.tagValidations = validations.map((validation) => validation.comment);
    });
  }

  addContact() {
    this.persistence.contact
      .add(this.userState.userId, this.user.userId)
      .then(this.userState.fetchUserInfo);
  }

  removeContact() {
    this.persistence.contact
      .remove(this.userState.userId, this.user.userId)
      .then(this.userState.fetchUserInfo);
  }

  goBackToPreviousPage() {
    this.location.back();
  }

  async addValidation() {
    const alert = await alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kommentar eingeben',
      inputs: [
        {
          name: 'tagText',
          type: 'text',
          label: 'tagText',
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            //todo persistence.addTagValidatio();
          },
        },
      ],
    });
    await alert.present();
  }
}
