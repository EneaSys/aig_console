import { Observable } from 'rxjs';

export interface IAuthService {
    $authenticationState: Observable<boolean>;

    isAuthenticated(): Promise<boolean>;
    getAccessToken(): Promise<string | undefined>;
    getIdToken(): Promise<string | undefined>;
    getUser(): Promise<any | undefined>;
    loginRedirect(fromUri?: string, additionalParams?: object): void;
    logout(uri?: string): Promise<void>;
}