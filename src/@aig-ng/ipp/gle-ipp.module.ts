import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { GleToolsModule } from '@aig-ng/tools/gle-tools.module';

import { CommonGenericModule } from 'aig-common/modules/generic/common-generic.module';

import { GleIppProcurementLotListLoaderComponent } from './components/procurement-lot/procurement-lot-list-loader/procurement-lot-list-loader.component';
import { GleIppProcurementLotListTablePrimeComponent } from './components/procurement-lot/procurement-lot-list-table-prime/procurement-lot-list-table-prime.component';

@NgModule({
    imports: [
        CommonModule,
        GleToolsModule,

        CommonGenericModule,
        
        TableModule,
    ],
    providers: [

    ],
    declarations: [
        GleIppProcurementLotListLoaderComponent,
        GleIppProcurementLotListTablePrimeComponent,
    ],
    exports: [
        GleIppProcurementLotListLoaderComponent,
    ],
})
export class GleIppModule {}