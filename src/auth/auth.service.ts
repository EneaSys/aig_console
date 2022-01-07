import { Injectable } from '@angular/core';
import { IAuthService } from './IAuthService';
import { AuthPigesImplService } from './impl/piges/auth-piges-impl.service';

@Injectable()
export class AuthService extends AuthPigesImplService implements IAuthService {
	
}