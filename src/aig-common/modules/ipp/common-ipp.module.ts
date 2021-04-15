import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigCommonModule } from 'aig-common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AigIppClientModule } from 'aig-italian-public-procurement';
import { AigProcurementListTableComponent } from './components/procurement-list-table/procurement-list-table.component';
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
import { AigProcurementLotListTableComponent } from './components/procurement-lot-list-table/procurement-lot-list-table.component';
import { AigProcurementNewUpdateFormComponent } from './components/procurement-new-update-form/procurement-new-update-form.component';
import { AigProcurementLotNewUpdateFormComponent } from './components/procurement-lot-new-update-form/procurement-lot-new-update-form.component';
import { MatDatepickerModule, MatMenu, MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { AigDossierListTableComponent } from './components/dossier-list-table/dossier-list-table.component';
import { AigDossierNewUpdateFormComponent } from './components/dossier-new-update-form/dossier-new-update-form.component';
import { DossierResolver } from './components/resolver/dossier.resolver';
import { AigPartecipationListTableComponent } from './components/partecipation-list-table/partecipation-list-table.component';
import { AigPartecipationNewUpdateFormComponent } from './components/partecipation-new-update-form/partecipation-new-update-form.component';
import { AigItalianLegislationApiModule } from 'aig-italianlegislation';
import { AigPartecipationStatusNewUpdateFormComponent } from './components/partecipation-status-new-update-form/partecipation-status-new-update-form.component';
import { AigPartecipationStatusListTableComponent } from './components/partecipation-status-list-table/partecipation-status-list-table.component';
import { AigPreparationListTableComponent } from './components/preparation-list-table/preparation-list-table.component';
import { AigPreparationNewUpdateFormComponent } from './components/preparation-new-update-form/preparation-new-update-form.component';
import { AigPreparationStatusListTableComponent } from './components/preparation-status-list-table/preparation-status-list-table.component';
import { AigPreparationStatusNewUpdateFormComponent } from './components/preparation-status-new-update-form/preparation-status-new-update-form.component';
import { AigInsurancePolicyNewUpdateFormComponent } from './components/insurance-policy-new-update-form/insurance-policy-new-update-form.component';
import { AigInsurancePolicyListTableComponent } from './components/insurance-policy-list-table/insurance-policy-list-table.component';

@NgModule({
    imports: [
        AigCommonModule,
        CommonModule,

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

        DossierResolver,

    ],
    declarations: [
        AigProcurementListTableComponent,
        AigProcurementLotListTableComponent,
        AigDossierListTableComponent,
        AigPartecipationListTableComponent,
        AigPartecipationStatusListTableComponent,
        AigPreparationListTableComponent,
        AigPreparationStatusListTableComponent,
        AigInsurancePolicyListTableComponent,

        AigProcurementNewUpdateFormComponent,
        AigProcurementLotNewUpdateFormComponent,
        AigDossierNewUpdateFormComponent,
        AigPartecipationNewUpdateFormComponent,
        AigPartecipationStatusNewUpdateFormComponent,
        AigPreparationNewUpdateFormComponent,
        AigPreparationStatusNewUpdateFormComponent,
        AigInsurancePolicyNewUpdateFormComponent,
        
    ],
    exports: [
        AigProcurementListTableComponent,
        AigProcurementLotListTableComponent,
        AigDossierListTableComponent,
        AigPartecipationListTableComponent,
        AigPartecipationStatusListTableComponent,
        AigPreparationListTableComponent,
        AigPreparationStatusListTableComponent,
        AigInsurancePolicyListTableComponent,
        
        AigDossierNewUpdateFormComponent,
        AigProcurementNewUpdateFormComponent,
        AigProcurementLotNewUpdateFormComponent,
        AigPartecipationNewUpdateFormComponent,
        AigPartecipationStatusNewUpdateFormComponent,
        AigPreparationNewUpdateFormComponent,
        AigPreparationStatusNewUpdateFormComponent,
        AigInsurancePolicyNewUpdateFormComponent,
    ]
        
    
})
export class AigCommonIppModule {}