import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { alertController } from '@ionic/core';
import { LoginPage } from 'src/app/shared/modules/login/login.page';
import { Tag } from 'src/app/shared/models/tag';
import { User } from 'src/app/shared/models/user';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';

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
  isUserLoggedInUser: boolean;
  isTagSelected: boolean = false;
  hasUserAddedValidationToSelectedTag = false;
  selectedTag: Tag;

  constructor(
    private route: ActivatedRoute,
    private persistence: PersistenceService,
    private userState: UserStateService,
    private location: Location,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.fetchInfo();
  }

  tagSelected(tag: Tag) {
    this.isTagSelected = true;
    this.selectedTag = tag;

    this.persistence.tag.getValidations(tag.tagId).then((validations) => {
      this.hasUserAddedValidationToSelectedTag = validations.some(
        (val) => val.validatedBy === this.userState.userId
      );
      this.tagValidations = validations.map((validation) => validation.comment);
    });
  }

  addContact() {
    this.persistence.contact
      .add(this.userState.userId, this.user.userId)
      .then(() => this.userState.fetchUserInfo());
    this.goBackToPreviousPage();
    this.presentAddedContact();
  }

  removeContact() {
    this.persistence.contact
      .remove(this.userState.userId, this.user.userId)
      .then(() => this.userState.fetchUserInfo());
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
          name: 'validationComment',
          type: 'text',
          label: 'validationComment',
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
            this.persistence.tag
              .addValidation(
                this.selectedTag.tagId,
                alertData.validationComment,
                this.userState.userId
              )
              .then(() => {
                this.fetchInfo();
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async fetchInfo() {
    //await this.userState.fetchUserInfo();
    const userId = this.route.snapshot.queryParamMap.get('id');

    if (this.userState.userId === userId) {
      this.isUserLoggedInUser = true;
    }

    this.isUserInContacts = this.userState.contacts.some(
      (contact) => contact.userId === userId
    );

    this.persistence.tag.getByUser(userId).then((tags) => {
      this.tags = tags;
    });
    this.persistence.user.getById(userId).then((val) => {
      this.user = val;
      this.isDataAvailable = true;
    });
  }

  async presentAddedContact() {
    const toast = await this.toastController.create({
      message:
        '<ion-icon name="checkmark-outline"></ion-icon>  Kontakt erfolgreich hinzugefügt.',
      position: 'top',
      color: 'success',
      duration: 800,
    });
    toast.present();
  }
}
