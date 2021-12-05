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
    const user = new User(
      this.firstname,
      this.lastname,
      this.dhbw,
      this.course,
      this.specialization,
      this.courseAbr,
      this.password,
      this.email
    );
    const persistence = new Persistence();
    persistence.registerUser(user);
  }
}
