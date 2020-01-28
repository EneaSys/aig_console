import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { apiGestRoute } from './api-gest-console.route';
import { AigCommonModule } from 'aig-common/common.module';
import { AigOldCommonModule } from 'aig-common/old-common/old-common.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'aig-common/auth.interceptor';
import { BASE_PATH } from 'api-gest';
import { API_URL } from 'app/app.constants';
import { AigApolloDocumentModule } from './modules/apollo-document/apollo-document.module';
import { AigEopooModule } from './modules/eopoo/eopoo.module';
import { AigIamModule } from './modules/iam/iam.module';
import { AigManagementModule } from './modules/management/management.module';
import { AigGenericComponentService } from './generic-component/generic-component.service';
import { AigModuleNavigationService } from './navigation/navigation.service';
import { AigGenericModule } from './modules/aig-generic/aig-generic.module';
import { AigStandardModule } from './modules/aig-standard/aig-standard.module';
import { AIG_STANDARD_BASE_PATH } from 'aig-standard';
import { AIG_GENERIC_BASE_PATH } from 'aig-generic';


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

        AigGenericModule,
        AigStandardModule,

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
            provide: BASE_PATH,
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
    ],
})
export class ApiGestConsoleModule { }