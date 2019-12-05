import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthGuardOktaImplService } from './impl/auth-guard-okta-impl.service';

@Injectable()
export class AuthGuardService extends AuthGuardOktaImplService implements CanActivate {
    
}