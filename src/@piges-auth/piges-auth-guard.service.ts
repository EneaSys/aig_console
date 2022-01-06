import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { PigesAuthService } from './piges-auth.service';

@Injectable()
export class PigesAuthGuard implements CanActivate {
    
    constructor(
		private pigesAuthService: PigesAuthService
	) { }
    
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		try {
			let userInfo = this.pigesAuthService.getUser();
			if(userInfo !== null) {
				return true;
			}
		} catch (error) {
			
		} finally {
			this.pigesAuthService.loginRedirect();
			return false;
		}
	}
}
