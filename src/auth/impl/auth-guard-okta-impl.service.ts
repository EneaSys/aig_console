import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OktaAuthGuard } from '@okta/okta-angular';

@Injectable()
export class AuthGuardOktaImplService implements CanActivate {
    constructor(
        private oktaAuthGuard : OktaAuthGuard
    ){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.oktaAuthGuard.canActivate(route, state);
    }
}