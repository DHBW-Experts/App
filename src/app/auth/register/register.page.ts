import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { Persistence } from 'src/app/models/Persistence';
import { User } from 'src/app/models/User';
import { LoginPage } from '../login/login.page';

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
  passwordwdh: String;

  constructor(public formBuilder: FormBuilder, private router: Router) {}

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
  async register() {
    const email = (<HTMLInputElement>document.getElementById('mail')).value; //ngmodel doesnt work here, because text is set by js
    if (this.password !== this.passwordwdh) {
      const alert = await alertController.create({
        header: 'Fehler',
        message: 'Die Passwörter stimmen nicht überein!',
        buttons: ['Ok'],
      });
      await alert.present();
      return;
    }
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
    this.router.navigate(['../../tabs/search']);
  }

  backToLoginPage() {
    this.router.navigate(['../login']);
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
