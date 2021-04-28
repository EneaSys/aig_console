import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AigCommonIppModule } from 'aig-common/modules/ipp/common-ipp.module';
import { i16nRoute } from './i16n.route';

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
import { FuseSharedModule } from '@fuse/shared.module';
import { MatPaginatorModule, MatDatepickerModule, MatSliderModule, MatCardModule, MatList, MatListModule, MatSlideToggleModule, MatSelectModule, MatMenuModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AigItalianLegislationApiModule } from 'aig-italianlegislation';
import { AigDettaglioPagamentoListPageComponent } from './components/dettaglio-pagamento-list-page/dettaglio-pagamento-list-page.component';
import { AigCommonI16nModule } from 'aig-common/modules/i16n/common-i16n.module';
import { AigDettaglioPagamentoNewUpdateDialogComponent } from './components/dettaglio-pagamento-new-update-dialog/dettaglio-pagamento-new-update-dialog.component';
import { AigDettaglioPagamentoDetailPageComponent } from './components/dettaglio-pagamento-detail-page/dettaglio-pagamento-detail-page.component';




@NgModule({
    imports: [
        RouterModule.forChild(i16nRoute),

        CommonModule,
        AigCommonIppModule,
        AigIppClientModule,
        AigItalianLegislationApiModule,
        AigCommonI16nModule,
       
        FormsModule,
        ReactiveFormsModule,
        
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
        MatSelectModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatIconModule,
        MatMenuModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyALOoLRTrkbbyx1rC932uBL1Hz-dKIEN8E',
            libraries: ['places', 'drawing', 'geometry']
           }),
    ],
    providers: [
    ],
    declarations: [

        AigDettaglioPagamentoListPageComponent,


        AigDettaglioPagamentoDetailPageComponent,



        AigDettaglioPagamentoNewUpdateDialogComponent,

        
    ],
    exports: [

    ],

    entryComponents: [

        AigDettaglioPagamentoNewUpdateDialogComponent,


    ],
})
export class AigI16nModule {}