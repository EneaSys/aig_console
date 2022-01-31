import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService,
	) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        try {
			let userInfo = await this.authService.getUser();
			if(userInfo !== null) {
				return true;
			}
		} catch (e) { }
		this.router.navigateByUrl("/welcome-page");
		return false;
    }
}