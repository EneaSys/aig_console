import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AigCommonIppModule } from 'aig-common/modules/ipp/common-ipp.module';

import { AigProcurementListPageComponent } from './components/procurement-list-page/procurement-list-page.component';
import { ippRoute } from './ipp.route';
import { AigIppHeaderComponent } from './components/ipp-header/ipp-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FuseSidebarModule } from '@fuse/components';
import { AigIppClientModule } from 'aig-italian-public-procurement';

@NgModule({
    imports: [
        RouterModule.forChild(ippRoute),

        CommonModule,
        AigCommonIppModule,
        AigIppClientModule,
        
        FuseSidebarModule,
        
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatChipsModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
    ],
    providers: [
    ],
    declarations: [
        AigIppHeaderComponent,

        AigProcurementListPageComponent,
    ],
    exports: [

    ],
})
export class AigIppModule {}