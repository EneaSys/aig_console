import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { apiGestRoute } from './api-gest.route';
import { AigEopooModule } from './modules/eopoo/eopoo.module';
import { AigApolloDocumentModule } from './modules/apollo-document/apollo-document.module';
import { AigIamModule } from './modules/iam/iam.module';


@NgModule({
    declarations: [
        
    ],
    imports: [
        RouterModule.forChild(apiGestRoute),

        AigIamModule,

        AigEopooModule,
        AigApolloDocumentModule,
        
        
    ],
    exports: [
        
    ],
    providers: [
        
    ],
})
export class ApiGestModule { }