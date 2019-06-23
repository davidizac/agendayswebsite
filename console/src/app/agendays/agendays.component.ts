import { Component, OnInit } from '@angular/core';
import {AuthUserService} from '../auth/auth-user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agendays',
  templateUrl: './agendays.component.html',
  styleUrls: ['./agendays.component.scss']
})
export class AgendaysComponent implements OnInit {

  constructor(
    private authUserService: AuthUserService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  logout() {
    this.authUserService.logout();
    this.router.navigate(['/login']);
  }

}
