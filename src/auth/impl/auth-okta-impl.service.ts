import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { IAuthService } from '../IAuthService';

@Injectable()
export class AuthOktaImplService implements IAuthService {
    constructor(
        private oktaAuth: OktaAuthService
    ){ }

    $authenticationState = this.oktaAuth.$authenticationState;

    isAuthenticated(): Promise<boolean> {
        return this.oktaAuth.isAuthenticated();
    }
    getAccessToken(): Promise<string> {
        return this.oktaAuth.getAccessToken();
    }
    getIdToken(): Promise<string> {
        return this.oktaAuth.getIdToken();
    }
    getUser(): Promise<any> {
        return this.oktaAuth.getUser();
    }
    loginRedirect(fromUri?: string, additionalParams?: object): void {
        return this.oktaAuth.loginRedirect();
    }
    logout(uri?: string): Promise<void> {
        return this.oktaAuth.logout();
    }
}