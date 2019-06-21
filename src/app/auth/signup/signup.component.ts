import { Component, OnInit } from '@angular/core';
import {AuthUserService} from '../auth-user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  errorMessage: string;

  constructor( private authUserService: AuthUserService) { }

  ngOnInit() {
  }

  checkEmail() {
    this.authUserService.isEmailExist(this.email, true)
    .subscribe(result => {
      this.errorMessage = null;
    },
    (result => {
      this.errorMessage = result.error;
    }
    ));
  }

}
