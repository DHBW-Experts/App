import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      // evtl. Validation der Inputs aufsetzen
    });
  }

  /**
   * Hier kommt die Login-Logik rein
   */
  login() {
    console.log('Ab geht der Peter!');
  }

}
