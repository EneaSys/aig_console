import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthOktaImplModule } from './impl/auth-okta-impl.module';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
    declarations: [ ],
    imports: [ 
        CommonModule,

        AuthOktaImplModule,
    ],
    exports: [],
    providers: [
        AuthService,
        AuthGuardService,
    ],
})
export class AuthModule {}