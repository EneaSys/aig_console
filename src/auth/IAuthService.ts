import { Observable } from 'rxjs';

export interface IAuthService {
    $authenticationState: Observable<boolean>;

	getAuthorizationUrl(idpIdentifier: string, state?: string): string;
    isAuthenticated(): Promise<boolean>;
    getAccessToken(): Promise<string | undefined>;
    getUser(): Promise<any | undefined>;
    loginRedirect(idpIdentifier: string, fromUri?: string, additionalParams?: any): void;
    logout(uri?: string): Promise<void>;
}