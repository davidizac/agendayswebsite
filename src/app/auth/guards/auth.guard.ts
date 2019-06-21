import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthUserService } from '../auth-user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authUserService: AuthUserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authUserService.currentUserValue;
        if (currentUser) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
