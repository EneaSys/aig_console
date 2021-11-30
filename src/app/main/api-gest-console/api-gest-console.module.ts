import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { apiGestRoute } from './api-gest-console.route';
import { AigCommonModule } from 'aig-common/common.module';
import { AigOldCommonModule } from 'aig-common/old-common/old-common.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'aig-common/auth.interceptor';
import { API_URL } from 'app/app.constants';
import { AigApolloDocumentModule } from './modules/apollo-document/apollo-document.module';
import { AigIamModule } from './modules/iam/iam.module';
import { AigManagementModule } from './modules/management/management.module';
import { AigGenericComponentService } from './generic-component/generic-component.service';
import { AigModuleNavigationService } from './navigation/navigation.service';
import { AigGenericModule } from './modules/aig-generic/aig-generic.module';
import { AigStandardModule } from './modules/aig-standard/aig-standard.module';
import { AigIppModule } from './modules/ipp/ipp.module';

import { AIG_PATH } from 'api-gest';
import { AIG_STANDARD_PATH } from 'aig-standard';
import { AIG_GENERIC_PATH } from 'aig-generic';
import { AigSolidarityModule } from './modules/solidarity/solidarity.module';
import { AIG_SOLIDARETY_BASE_PATH } from 'aig-solidarety';
import { AigCommerceModule } from './modules/commerce/commerce.module';
import { AIG_COMMERCE_PATH } from 'aig-commerce';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { AigCommonManagementModule } from 'aig-common/modules/management/common-management.module';
import { FuseWidgetModule } from '@fuse/components';
import { AigWelcomeModule } from './modules/welcome/welcome.modlue';
import { AIG_M8T_PATH } from 'aig-management';
import { AIG_ITALIANLEGISLATION_PATH } from 'aig-italianlegislation';
import { AIG_WALLET_PATH } from 'aig-wallet';
import { AIG_E4Y_PATH } from 'aig-entity-manager';
import { AigWalletModule } from './modules/wallet/wallet.module';


@NgModule({
    declarations: [ ],
    imports: [
		FuseSharedModule,
		FuseWidgetModule,
		
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatToolbarModule,
		MatTableModule,
		
		AigCommonManagementModule,
		


        RouterModule.forChild(apiGestRoute),
		
        // Per il route prende AuthGuardService che è parte di Auth e per l' interceptor
        AigCommonModule,

        // Per i resolver del route
        AigOldCommonModule,

		AigWelcomeModule,
        // App modules
        AigApolloDocumentModule,
        //AigEopooModule,

        AigIamModule,
        AigManagementModule,

        AigStandardModule,
        
        AigGenericModule,
        AigIppModule,
        AigSolidarityModule,
        AigCommerceModule,
		AigWalletModule,

		
    ],
    exports: [],
    providers: [
        AigGenericComponentService,
        AigModuleNavigationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'it-IT'
        },
        {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: { useUtc: true }
        },
        {
            provide: AIG_PATH,
            useValue: API_URL
        },
        {
            provide: AIG_STANDARD_PATH,
            useValue: API_URL + "/s6d"
        },
        {
            provide: AIG_GENERIC_PATH,
            useValue: API_URL + "/g5c"
        },
        {
            provide: AIG_SOLIDARETY_BASE_PATH,
            useValue: API_URL + "/solidarety"
        },
        {
            provide: AIG_COMMERCE_PATH,
            useValue: API_URL + "/c6e"
        },
        {
            provide: AIG_M8T_PATH,
            useValue: API_URL + "/m8t"
        },
        {
            provide: AIG_ITALIANLEGISLATION_PATH,
            useValue: API_URL + "/i16n"
        },
		{
            provide: AIG_E4Y_PATH,
            useValue: API_URL
        },
		{
            provide: AIG_WALLET_PATH,
            useValue: API_URL + "/wallet"
        },
    ],
})
export class ApiGestConsoleModule { }