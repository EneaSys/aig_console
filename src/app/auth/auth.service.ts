import { Injectable } from '@angular/core';
import { IAuthService } from './IAuthService';
import { AuthOktaImplService } from './impl/auth-okta-impl.service';

@Injectable()
export class AuthService extends AuthOktaImplService implements IAuthService {
    
}