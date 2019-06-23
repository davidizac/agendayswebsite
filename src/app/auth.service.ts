import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {AuthUserService} from './auth/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  calendarItems: any[];
  returnUrl: string;


  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    public authUserService: AuthUserService,
    private router: Router
    ) {
    this.initClient();
    this.user$ = afAuth.authState;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client');

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyA8dWBPgKW7IE-eZGMROuWxn7F8j-y1pXg',
        clientId: '25958110232-j20k6ml49ftd3cmpjgianv3eia2n1gq9.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    const credential = auth.GoogleAuthProvider.credential(token);
    await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
    this.router.navigate([this.returnUrl]);
  }


  getUserasObservable() {
    return this.user$;
  }

  // async getCalendar() {
  //   const events = await gapi.client.calendar.events.list({
  //     calendarId: 'primary',
  //     timeMin: new Date().toISOString(),
  //     showDeleted: false,
  //     singleEvents: true,
  //     maxResults: 10,
  //     orderBy: 'startTime'
  //   });

  //   console.log(events)

  //   this.calendarItems = events.result.items;

  // }


}
