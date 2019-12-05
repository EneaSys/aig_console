import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { EopooHeaderComponent } from './components/eopoo-header.component';
import { EopooListComponent } from './components/eopoo-list/eopoo-list.component';
import { EopooListTableComponent } from './components/eopoo-list/eopoo-list-table.component';
import { EopooNewComponent } from './components/eopoo-new/eopoo-new.component';
import { EopooDetailComponent } from './components/eopoo-detail/eopoo-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AigCommonModule } from 'aig-common/common.module';
import { AigOldCommonModule } from 'aig-common/old-common/old-common.module';


@NgModule({
    declarations: [
        EopooHeaderComponent,

        EopooListComponent,
        EopooListTableComponent,

        EopooNewComponent,
        EopooDetailComponent,

    ],
    imports: [
        AigCommonModule,
        // Per i service
        AigOldCommonModule,

        FuseSharedModule,
        FuseSidebarModule,

        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,

    ],
    exports: [ ],
    providers: [ ],
})
export class AigEopooModule {}