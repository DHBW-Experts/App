import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  firstname: string;
  lastname: string;
  courseAbbr: string;
  course: string;
  specialization: string;
  city: string;
  biography: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private persistence: PersistenceService,
    public userState: UserStateService
  ) {}

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
    });
  }

  async register() {
    const user = this.userState.user;

    user.firstname = this.firstname;
    user.lastname = this.lastname;
    user.course = this.course;
    user.specialization = this.specialization;
    user.courseAbbr = this.courseAbbr;
    user.biography = this.biography;
    user.city = this.city;

    console.log(user);

    this.persistence.user.register(user, user.userId)
      .then((user) => {
        this.userState.user = user;
        this.router.navigate(['/tabs/profile']);
      });
  }

  backToLoginPage() {
    this.userState.logout();
  }
}
