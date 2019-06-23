import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})

export class AuthUserService {


  authState: any = null;

  constructor(private http: HttpClient, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  onLogin(email, password) {
    return this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }

  onSignUpWithPassword(email, password) {
    return this.afAuth
    .auth
    .createUserWithEmailAndPassword(email, password).then(data => {
      return data.user.sendEmailVerification();
    });
  }

  logout() {
    firebase.auth().signOut();
  }

  isEmailExist(email, isSignup) {
    return this.http.post(environment.isEmailExist, { email: email, isSignup: isSignup});
  }
}
