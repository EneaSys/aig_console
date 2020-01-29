import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AigCommonModule } from 'aig-common/common.module';
import { AigCityListTableComponent } from './components/city-list-table/city-list-table.component';
import { FuseSidebarModule } from '@fuse/components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [

        AigCityListTableComponent,
        

        
    ],
    imports: [ 
        AigCommonModule,
        CommonModule,

        MatTableModule,
        MatProgressSpinnerModule,
        RouterModule,

        MatTableModule,
        MatProgressSpinnerModule,

        FuseSidebarModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,


        
        FlexLayoutModule,

    ],
    exports: [

        AigCityListTableComponent,



    ],
    providers: [],
})
export class AigCommonStandardModule {}