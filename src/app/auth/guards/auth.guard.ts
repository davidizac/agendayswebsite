import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthUserService} from '../auth-user.service';
import {tap, take, map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {


    constructor(private router: Router, public authUserService: AuthUserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authUserService.authenticated) { return true; }
        return this.authUserService.currentUserObservable
        .pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => {
            if (!loggedIn) {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            }
            })
        );
    }
}
