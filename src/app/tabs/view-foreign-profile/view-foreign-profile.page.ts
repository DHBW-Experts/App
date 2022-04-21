import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { alertController } from '@ionic/core';
import { LoginPage } from 'src/app/auth/login/login.page';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';
import { PersistenceService } from 'src/app/services/persistence.service';

@Component({
  selector: 'app-view-foreign-profile',
  templateUrl: './view-foreign-profile.page.html',
  styleUrls: ['./view-foreign-profile.page.scss'],
})
export class ViewForeignProfilePage implements OnInit {
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
  ) {}
  
  ngOnInit(): void {}

  ionViewWillEnter() {
    const userId = +this.route.snapshot.paramMap.get('id');

    this.persistence.user.getById(userId).then(user => {
      this.user = user;
      this.isDataAvailable = true;
      
      const contactsPromise = this.persistence.contact.getByUserId(
        LoginPage.user.userId
      ).then(contacts => {
        this.contacts = contacts;

        if (LoginPage.user.userId === this.user.userId) {
          this.isUserLoggedInUser = true;
          return;
        }
        
        this.isUserInContacts = this.contacts.some(
          e => e.userId === this.user.userId
        );
      });
    });

    this.persistence.tag.getByUser(userId).then(tags => {
      this.tags = tags;
    });
  }

  tagSelected(tag: Tag) {
    this.isTagSelected = true;
    this.selectedTag = tag;
    
    this.persistence.tag.getValidations(tag.tagId).then(validations => {
      this.tagValidations = validations.map(validation => validation.comment);
    });
  }
  
  addContact() {
    this.persistence.contact.add(LoginPage.user.userId, this.user.userId);
  }
  
  removeContact() {
    this.persistence.contact.remove(LoginPage.user.userId, this.user.userId);
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
