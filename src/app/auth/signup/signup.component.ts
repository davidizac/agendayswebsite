import { Component, OnInit } from '@angular/core';
import {AuthUserService} from '../auth-user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  errorMessage: string;
  password: string;
  isEmailExist = false;
  isGoogleProvider = true;
  isSignedUp = false;

  constructor(
    private authUserService: AuthUserService,
    public auth: AuthService
    ) { }

  ngOnInit() {
  }

  checkEmail() {
    this.authUserService.isEmailExist(this.email, true)
    .subscribe(result => {
      this.errorMessage = null;
      this.isEmailExist = true;
    },
    (result => {
      this.errorMessage = result.error;
    }
    ));
  }

  preferWithPassword() {
    this.isGoogleProvider = false;
  }

  onSignUpWithPassword() {
    this.authUserService.onSignUpWithPassword(this.email, this.password)
    .then(() => {
      this.isSignedUp = true;
    })
    .catch(error => {
      this.errorMessage = error;
    });
  }

}
