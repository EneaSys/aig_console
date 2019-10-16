import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthOktaImplModule } from './impl/auth-okta-impl.module';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AigContextModule } from 'app/context/context.module';

@NgModule({
    declarations: [ ],
    imports: [ 
        CommonModule,

        AigContextModule,
        
        AuthOktaImplModule,
    ],
    exports: [],
    providers: [
        AuthService,
        AuthGuardService,
    ],
})
export class AuthModule {}