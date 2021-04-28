import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigCommonModule } from 'aig-common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AigIppClientModule } from 'aig-italian-public-procurement';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatDatepickerModule, MatMenu, MatMenuModule, MatSlideToggleModule } from '@angular/material';

import { AigItalianLegislationApiModule } from 'aig-italianlegislation';

import { CommonGenericModule } from '../generic/common-generic.module';
import { AigDettaglioPagamentoListTableComponent } from './components/dettaglio-pagamento-list-table/dettaglio-pagamento-list-table.component';
import { AigDettaglioPagamentoNewUpdateFormComponent } from './components/dettaglio-pagamento-new-update-form/dettaglio-pagamento-new-update-form.component';
import { AigDettaglioPagamentoDetailComponent } from './components/dettaglio-pagamento-detail/dettaglio-pagamento-detail.component';
import { DettaglioPagamentoResolver } from './resolver/dettaglio-pagamento.resolver';



@NgModule({
    imports: [
        AigCommonModule,
        CommonModule,
        CommonGenericModule,

        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        AigIppClientModule,
        AigItalianLegislationApiModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatMenuModule,
        MatDatepickerModule,
    ],
    providers: [

        DettaglioPagamentoResolver,


    ],
    declarations: [

        AigDettaglioPagamentoListTableComponent,


        AigDettaglioPagamentoNewUpdateFormComponent,


        AigDettaglioPagamentoDetailComponent,
        
    ],
    exports: [

        AigDettaglioPagamentoListTableComponent,


        AigDettaglioPagamentoNewUpdateFormComponent,


        AigDettaglioPagamentoDetailComponent,
    ]
        
    
})
export class AigCommonI16nModule {}