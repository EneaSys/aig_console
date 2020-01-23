import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { aigGenericRoute } from './aig-generic.route';
import { ApiGestModule } from 'api-gest';

@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forChild(aigGenericRoute),

        CommonModule,
    ],
    exports: [],
    providers: [],
})
export class AigGenericModule {}