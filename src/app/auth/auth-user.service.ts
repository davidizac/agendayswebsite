import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthUserService {

  private currentUserSubject: BehaviorSubject<object>;
  public currentUser: Observable<object>;

  constructor(private http: HttpClient, public afAuth: AngularFireAuth) {
    this.currentUserSubject = new BehaviorSubject<object>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): object {
    return this.currentUserSubject.value;
  }

  onLogin(email, password) {
    return this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      });
  }

  onSignUpWithPassword(email, password) {
    return this.afAuth
    .auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isEmailExist(email, isSignup) {
    return this.http.post(environment.isEmailExist, { email: email, isSignup: isSignup});
  }
}
