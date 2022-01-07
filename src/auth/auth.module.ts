import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { PigesAuthModule } from '../@piges-auth/piges-auth.module';
import { RouterModule } from '@angular/router';
import { OktaAuthModule, OktaCallbackComponent, OktaLoginRedirectComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { AuthPigesImplService } from './impl/piges/auth-piges-impl.service';
import { PigesAuthCallbackComponent } from '@piges-auth/piges-auth-callback.component';
import { PIGES_CONFIG } from '@piges-auth/pigest.export';

registerLocaleData(localeIt);

var url = location.protocol + '//' + location.host;

// Okta
const oktaConfig = {
    issuer: 'https://oauth2.innova-s.com/oauth2/ausuw3xfhUTtDnmk4356',
    redirectUri: url + '/implicit/callback',
    clientId: '0oauw2o08aTx59dvx356'
}
// Piges
const pigesConfig = {
	serverUrl: 'https://auth.piges.io',
	clientId: '799gvm543j1dk1im08augie769',
	clientSecret: '',
	redirectUrl: url + '/piges/auth/callback',
	//idp_identifier: ''//'apigest-okta'
}

const routes = [
	// Okta
	{
        path: 'implicit/callback',
        component: OktaCallbackComponent
    },
    {
        path: 'login',
        component: OktaLoginRedirectComponent
    },
	// Piges
    {
        path: 'piges/auth/callback',
        component: PigesAuthCallbackComponent,
    },
];

@NgModule({
    declarations: [ ],
    imports: [ 
        CommonModule,

		OktaAuthModule,
		PigesAuthModule,

		RouterModule.forRoot(routes)
    ],
    exports: [],
    providers: [
        AuthService,
        AuthGuardService,
		
		{ provide: LOCALE_ID, useValue: 'it'},

		// Okta
		{ provide: OKTA_CONFIG, useValue: oktaConfig },
		//AuthOktaImplService,
        //AuthGuardOktaImplService,

		// Piges
		{ provide: PIGES_CONFIG, useValue: pigesConfig },
		AuthPigesImplService,
        //AuthGuardPigesImplService,
    ],
})
export class AuthModule {}