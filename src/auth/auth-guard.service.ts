import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(
		private authService: AuthService,
	) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        try {
			let userInfo = this.authService.getUser();
			if(userInfo !== null) {
				return true;
			}
		} catch (e) { }
		
		return false;
    }
}