import { NgModule } from '@angular/core';

import {
    OKTA_CONFIG,
    OktaAuthModule,
    OktaCallbackComponent,
    OktaLoginRedirectComponent
} from '@okta/okta-angular';

import { AuthOktaImplService } from './auth-okta-impl.service';
import { RouterModule } from '@angular/router';
import { AuthGuardOktaImplService } from './auth-guard-okta-impl.service';

var url = location.protocol + '//' + location.host;

const oktaConfig = {
    issuer: 'https://oauth2.innova-s.com/oauth2/ausuw3xfhUTtDnmk4356',
    redirectUri: url + '/implicit/callback',
    clientId: '0oauw2o08aTx59dvx356'
}

const routes = [
    {
        path: 'implicit/callback',
        component: OktaCallbackComponent
    },
    {
        path: 'login',
        component: OktaLoginRedirectComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        OktaAuthModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
    providers: [
        { provide: OKTA_CONFIG, useValue: oktaConfig },
        AuthOktaImplService,
        AuthGuardOktaImplService,
    ],
})
export class AuthOktaImplModule { }