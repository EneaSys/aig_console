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
        AigEopooModule,

        AigIamModule,
        AigManagementModule,

    ],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: BASE_PATH,
            useValue: API_URL
        },
    ],
})
export class ApiGestConsoleModule { }