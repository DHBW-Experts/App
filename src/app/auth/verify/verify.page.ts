import { Component, OnInit } from '@angular/core';
import { PersistenceService } from 'src/app/services/persistence/persistence.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  constructor(private persistence: PersistenceService) {}

  code_digit_field_1: String;
  code_digit_field_2: String;
  code_digit_field_3: String;
  code_digit_field_4: String;
  code_digit_field_5: String;
  code_digit_field_6: String;
  ngOnInit() {}
  verify() {
    const verificationcode =
      this.code_digit_field_1 +
      '' +
      this.code_digit_field_2 +
      this.code_digit_field_3 +
      this.code_digit_field_4 +
      this.code_digit_field_5 +
      this.code_digit_field_6;

    //this.persistence.auth0.verify(LoginPage.user.userId, verificationcode); handle with auth0
  }
}
