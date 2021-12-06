import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Persistence } from 'src/app/models/Persistence';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  firstname: String;
  lastname: String;
  email: String;
  dhbw: String;
  course: String;
  specialization: String;
  courseAbr: String;
  password: String;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    // Validation der Inputs aufsetzen
    this.form = this.formBuilder.group({
      firstname: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(32)])
      ),
      lastname: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(32)])
      ),
      dhbw: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });
  }

  /**
   * Hier kommt die Register-Logik rein
   */
  register() {
    const email = (<HTMLInputElement>document.getElementById('mail')).value; //ngmodel doesnt work here, because text is set by js
    const user = new User(
      this.firstname,
      this.lastname,
      this.dhbw,
      this.course,
      this.specialization,
      this.courseAbr,
      this.password,
      email
    );
    const persistence = new Persistence();
    persistence.registerUser(user);
  }
  restoreMailExample() {
    const domains = new Map();

    domains.set('not-set', '@beispiel-dhbw.de');
    domains.set('Karlsruhe', '@student.dhbw-karlsruhe.de');
    domains.set('Stuttgart', '@???-dhbw.de');
    domains.set('Mannheim', '@???-dhbw.de');
    domains.set('Heilbronn', '@???-dhbw.de');

    const name = (document.getElementById('mail') as HTMLInputElement).value;
    const domain = (document.getElementById('standort') as HTMLSelectElement)
      .value;

    document.getElementById('email_preview_text').textContent =
      name + domains.get(domain);
  }
  setMail() {
    const firstname = (
      document.getElementById('firstname_input') as HTMLInputElement
    ).value;

    const lastname = (
      document.getElementById('lastname_input') as HTMLInputElement
    ).value;
    if (firstname != '' && lastname != '') {
      (document.getElementById('mail') as HTMLInputElement).value =
        lastname.toLowerCase() + '.' + firstname.toLowerCase();
      this.restoreMailExample();
    }
  }
}
