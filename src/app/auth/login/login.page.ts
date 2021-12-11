import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { alertController } from '@ionic/core';
import { Persistence } from 'src/app/models/Persistence';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      // evtl. Validation der Inputs aufsetzen
    });
  }

  /**
   * Hier kommt die Login-Logik rein
   */
  static user: User; // this is the global user object
  email: String;
  password: String;

  login() {
    console.log('Ab geht der Peter!');
    const persistence = new Persistence();
    const userPromise = persistence.getUserByEmail(this.email);
    userPromise.then(async (result) => {
      LoginPage.user = result; //dummy login
    });
  }
}
