import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AigCommonModule } from 'aig-common/common.module';

@NgModule({
    declarations: [

        
    ],
    imports: [ 
        AigCommonModule,
        CommonModule,

        MatTableModule,
        MatProgressSpinnerModule,



        
        FlexLayoutModule,

    ],
    exports: [],
    providers: [],
})
export class AigCommonStandardModule {}