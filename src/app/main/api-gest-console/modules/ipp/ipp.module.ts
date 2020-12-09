import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AigCommonIppModule } from 'aig-common/modules/ipp/common-ipp.module';

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
import { AigIppListPageComponent } from './components/ipp-list-page/ipp-list-page.component';
import { AigIppLotListPageComponent } from './components/ipp-lot-list-page/ipp-lot-list-page.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatPaginatorModule, MatDatepickerModule, MatSliderModule, MatCardModule, MatList, MatListModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        RouterModule.forChild(ippRoute),

        CommonModule,
        AigCommonIppModule,
        AigIppClientModule,
        
        FuseSharedModule,
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
        MatPaginatorModule,
        MatDatepickerModule,
        MatSliderModule,
        MatCardModule,
        MatListModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyALOoLRTrkbbyx1rC932uBL1Hz-dKIEN8E',
            libraries: ['places', 'drawing', 'geometry']
           }),
    ],
    providers: [
    ],
    declarations: [
        AigIppHeaderComponent,

        AigIppListPageComponent,
        AigIppLotListPageComponent,
    ],
    exports: [

    ],
})
export class AigIppModule {}