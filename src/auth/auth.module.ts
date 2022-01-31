import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import localeIt from '@angular/common/locales/it';

import { PigesAuthModule, PigesAuthCallbackComponent, PIGES_CONFIG } from '@piges/auth-angular';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthPigesImplService } from './impl/piges/auth-piges-impl.service';

registerLocaleData(localeIt);

// Piges
const pigesConfig = {
	serverUrl: 'https://auth.piges.io',
	authorizeUrl: 'https://account.piges.io',
	clientId: '799gvm543j1dk1im08augie769',
	clientSecret: '',
	redirectUrl: window.location.origin + '/piges/auth/callback',
	idp_identifier: ''
}

const routes = [
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

		PigesAuthModule,

		RouterModule.forRoot(routes)
    ],
    exports: [],
    providers: [
        AuthService,
        AuthGuardService,
		
		{ provide: LOCALE_ID, useValue: 'it'},

		// Piges
		{ provide: PIGES_CONFIG, useValue: pigesConfig },
		AuthPigesImplService,
        //AuthGuardPigesImplService,
    ],
})
export class AuthModule {}