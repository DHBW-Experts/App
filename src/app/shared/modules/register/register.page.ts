import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form: FormGroup;
  firstname: string;
  checkFirstname: string = 'rgb(170, 170, 170)';
  lastname: string;
  checkLastname: string = 'rgb(170, 170, 170)';
  courseAbbr: string;
  checkCourseAbbr: string = 'rgb(170, 170, 170)';
  course: string;
  checkCourse: string = 'rgb(170, 170, 170)';
  specialization: string;
  city: string;
  biography: string;
  validationPassed: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private persistence: PersistenceService,
    public userState: UserStateService,
    private toastController: ToastController
  ) {}

  async register() {
    const user = this.userState.user;
    this.resetBorderColors();

    if(this.firstname == null || /\d/.test(this.firstname)) {
      this.checkFirstname = 'rgb(178, 0, 45)';
      this.validationPassed = false;
    } else {
      user.firstname = this.firstname;
    }
    if(this.lastname == null || /\d/.test(this.lastname)) {
      this.checkLastname = 'rgb(178, 0, 45)';
      this.validationPassed = false;
    } else {
      user.lastname = this.lastname;
    }
    if(this.course == null || /\d/.test(this.course)) {
      this.checkCourse = 'rgb(178, 0, 45)';
      this.validationPassed = false;
    } else {
      user.course = this.course;
    }
    user.specialization = this.specialization;
    if(this.courseAbbr == null ){
      this.checkCourseAbbr = 'rgb(178, 0, 45)';
      this.validationPassed = false;
    } else {
      user.courseAbbr = this.courseAbbr;
    }
    user.biography = this.biography;
    user.city = this.city;

    if(!this.validationPassed) {
      this.presentRegisteringFailed();
      this.validationPassed = true;
      return;
    }

    this.persistence.user.register(user, user.userId)
      .then((u) => {
        this.userState.user = u;
        this.router.navigate(['/tabs/profile']);
      });
  }

  backToLoginPage() {
    this.userState.logout();
  }

  async presentRegisteringFailed() {
    const toast = await this.toastController.create({
      header: 'Etwas ist schiefgelaufen!',
      message:
        '\nBitte überprüfe deine Angaben und versuche es erneut.',
      position: 'top',
      color: 'danger',
      duration: 3200,
    });
    toast.present();
  }

  async resetBorderColors() {
    this.checkFirstname = 'rgb(170, 170, 170)';
    this.checkLastname = 'rgb(170, 170, 170)';
    this.checkCourse = 'rgb(170, 170, 170)';
    this.checkCourseAbbr = 'rgb(170, 170, 170)';
  }
}
