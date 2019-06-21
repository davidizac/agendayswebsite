import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthUserService {

  constructor(private http: HttpClient) { }


  isEmailExist(email, isSignup) {
    return this.http.post(environment.isEmailExist, { email: email, isSignup: isSignup});
  }
}
