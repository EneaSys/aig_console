import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { apiGestRoute } from './api-gest-console.route';
import { AigCommonModule } from 'aig-common/common.module';
import { AigOldCommonModule } from 'aig-common/old-common/old-common.module';


@NgModule({
    declarations: [
        
    ],
    imports: [
        RouterModule.forChild(apiGestRoute),

        // Per il route prende AuthGuardService che è parte di Auth 
        AigCommonModule,
        
        // Per i resolver del route
        AigOldCommonModule,
    ],
    exports: [ ],
    providers: [ ],
})
export class ApiGestConsoleModule { }