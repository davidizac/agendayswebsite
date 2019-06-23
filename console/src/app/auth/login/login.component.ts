import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {AuthUserService} from '../auth-user.service';
import { Router, ActivatedRoute } from '@angular/router';

enum GoogleProvider {
  id = 'google.com',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  errorMessage: string;
  email: string;
  password: string;
  isEmailExist = false;
  isGoogleProvider = false;
  returnUrl: string;

  constructor(
    private authUserService: AuthUserService,
    public auth: AuthService ,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  checkEmail() {
    this.authUserService.isEmailExist(this.email, false )
    .subscribe((user) => {
      this.isEmailExist = true;
      if (user['providerData'][0]['providerId'] === GoogleProvider.id) {
        this.isGoogleProvider = true;
      }
    },
    (error) => {
      this.errorMessage = error.error;
    }
    );
  }

  onLogin() {
    this.authUserService.onLogin(this.email, this.password)
    .then(data => {
      this.router.navigate([this.returnUrl]);
    })
    .catch(error => {
      this.errorMessage = error;
    });
  }

  notUser() {
    this.isEmailExist = false;
    this.email = null;
  }
}
