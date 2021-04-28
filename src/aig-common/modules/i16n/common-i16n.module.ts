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
import { AigDatiPagamentoListTableComponent } from './components/dati-pagamento-list-table/dati-pagamento-list-table.component';
import { AigI16nAutocompleteFilterService } from './service/autocomplete-filter.service';
import { AigI16nAutocompleteDisplayService } from './service/autocomplete-function.service';
import { AigFatturaElettronicaBodyListTableComponent } from './components/fattura-elettronica-body-list-table/fattura-elettronica-body-list-table.component';
import { AigFatturaElettronicaBodyNewUpdateFormComponent } from './components/fattura-elettronica-body-new-update-form/fattura-elettronica-body-new-update-form.component';
import { AigFatturaElettronicaBodyDetailComponent } from './components/fattura-elettronica-body-detail/fattura-elettronica-body-detail.component';
import { AigDatiPagamentoDetailComponent } from './components/dati-pagamento-detail/dati-pagamento-detail.component';
import { FatturaElettronicaBodyResolver } from './resolver/fattura-elettronica-body.resolver';
import { AigDatiPagamentoNewUpdateFormComponent } from './components/dati-pagamento-new-update-form/dati-pagamento-new-update-form.component';
import { DatiPagamentoResolver } from './resolver/dati-pagamento.resolver';
import { DatiVeicoliResolver } from './resolver/dati-veicoli.resolver';
import { AllegatiResolver } from './resolver/allegati.resolver';



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
        FatturaElettronicaBodyResolver,
        DatiPagamentoResolver,
        DatiVeicoliResolver,
        AllegatiResolver,


        AigI16nAutocompleteFilterService,
        AigI16nAutocompleteDisplayService,


    ],
    declarations: [

        AigDettaglioPagamentoListTableComponent,
        AigDatiPagamentoListTableComponent,
        AigFatturaElettronicaBodyListTableComponent,


        AigDettaglioPagamentoNewUpdateFormComponent,
        AigFatturaElettronicaBodyNewUpdateFormComponent,
        AigDatiPagamentoNewUpdateFormComponent,


        AigDettaglioPagamentoDetailComponent,
        AigFatturaElettronicaBodyDetailComponent,
        AigDatiPagamentoDetailComponent,
        
    ],
    exports: [

        AigDettaglioPagamentoListTableComponent,
        AigDatiPagamentoListTableComponent,
        AigFatturaElettronicaBodyListTableComponent,


        AigDettaglioPagamentoNewUpdateFormComponent,
        AigFatturaElettronicaBodyNewUpdateFormComponent,
        AigDatiPagamentoNewUpdateFormComponent,


        AigDettaglioPagamentoDetailComponent,
        AigFatturaElettronicaBodyDetailComponent,
        AigDatiPagamentoDetailComponent,
    ]
        
    
})
export class AigCommonI16nModule {}