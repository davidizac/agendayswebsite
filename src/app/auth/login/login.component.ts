import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {AuthUserService} from '../auth-user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


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

  constructor( private authUserService: AuthUserService, public auth: AuthService, public afAuth: AngularFireAuth ) { }

  ngOnInit() {
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
    this.afAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(value => {
        console.log(value);
        this.auth.getUserasObservable().subscribe((user) => {
          console.log(user);
        });
      })
      .catch(err => {
        this.errorMessage = 'Invalid password';
      });
  }

  notUser() {
    this.isEmailExist = false;
    this.email = null;
  }
}
