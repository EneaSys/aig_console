import { Injectable } from '@angular/core';
import { PigesAuthService } from '@piges-auth/piges-auth.service';
import { IAuthService } from '../../IAuthService';

@Injectable()
export class AuthPigesImplService implements IAuthService {
    constructor(
        private pigesAuthService: PigesAuthService
    ){ }
	
	$authenticationState = this.pigesAuthService.$authenticationState;

	getAuthorizationUrl(idpIdentifier: string, state?: string): string {
		return this.pigesAuthService.getAuthorizationUrl(idpIdentifier, state);
	}
    isAuthenticated(): Promise<boolean> {
        return this.pigesAuthService.isAuthenticated();
    }
    getAccessToken(): Promise<string> {
        return this.pigesAuthService.getAccessToken();
    }
    getUser(): Promise<any> {
        return this.pigesAuthService.getUser();
    }
    loginRedirect(idpIdentifier: string, fromUri?: string, additionalParams?: any): void {
        return this.pigesAuthService.loginRedirect(idpIdentifier, fromUri, additionalParams);
    }
    logout(uri: string): Promise<void> {
        return this.pigesAuthService.logout(uri);
    }
}