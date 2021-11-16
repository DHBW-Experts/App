import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    // Validation der Inputs aufsetzen
    this.form = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(32),
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(32),
      ])),
      dhbw: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])),
    });
  }

  /**
   * Hier kommt die Register-Logik rein
   */
  register() {
    console.log('Ab geht der Peter!');
  }

}
