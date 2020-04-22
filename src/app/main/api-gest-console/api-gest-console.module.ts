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
import { AIG_STANDARD_BASE_PATH } from 'aig-standard';
import { AIG_GENERIC_BASE_PATH } from 'aig-generic';
import { AIG_IPP_BASE_PATH } from 'aig-italian-public-procurement';
import { AigSolidarityModule } from './modules/solidarity/solidarity.module';
import { AIG_SOLIDARETY_BASE_PATH } from 'aig-solidarety';
import { AigCommerceModule } from './modules/commerce/commerce.module';
import { COMMERCE_PATH } from 'aig-commerce';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';


@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forChild(apiGestRoute),

        // Per il route prende AuthGuardService che è parte di Auth e per l' interceptor
        AigCommonModule,

        // Per i resolver del route
        AigOldCommonModule,

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
            provide: AIG_STANDARD_BASE_PATH,
            useValue: API_URL + "/s6d"
        },
        {
            provide: AIG_GENERIC_BASE_PATH,
            useValue: API_URL + "/g5c"
        },
        {
            provide: AIG_IPP_BASE_PATH,
            useValue: API_URL + "/ipp"
        },
        {
            provide: AIG_SOLIDARETY_BASE_PATH,
            useValue: API_URL + "/solidarety"
        },
        {
            provide: COMMERCE_PATH,
            useValue: API_URL + "/c6e"
        },
    ],
})
export class ApiGestConsoleModule { }