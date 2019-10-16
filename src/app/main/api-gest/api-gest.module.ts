import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { apiGestRoute } from './api-gest.route';
import { AigEopooModule } from './modules/eopoo/eopoo.module';
import { AigApolloDocumentModule } from './modules/apollo-document/apollo-document.module';
import { AigIamModule } from './modules/iam/iam.module';
import { AigManagementModule } from './modules/management/management.module';
import { AigContextModule } from 'app/context/context.module';


@NgModule({
    declarations: [
        
    ],
    imports: [
        RouterModule.forChild(apiGestRoute),

        AigContextModule,

        AigIamModule,

        AigManagementModule,

        AigEopooModule,
        AigApolloDocumentModule,
        
        
    ],
    exports: [
        
    ],
    providers: [
        
    ],
})
export class ApiGestModule { }