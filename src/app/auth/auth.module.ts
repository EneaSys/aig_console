import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthOktaImplModule } from './impl/auth-okta-impl.module';

@NgModule({
    declarations: [ ],
    imports: [ 
        CommonModule,
        AuthOktaImplModule
    ],
    exports: [],
    providers: [
        AuthService,
    ],
})
export class AuthModule {}