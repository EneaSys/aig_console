import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigCommonModule } from 'aig-common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AigProcurementListTableComponent } from './components/procurement-list-table/procurement-list-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AigProcurementLotListTableComponent } from './components/procurement-lot-list-table/procurement-lot-list-table.component';
import { AigProcurementNewUpdateFormComponent } from './components/procurement-new-update-form/procurement-new-update-form.component';
import { AigProcurementLotNewUpdateFormComponent } from './components/procurement-lot-new-update-form/procurement-lot-new-update-form.component';
import { MatDatepickerModule, MatMenu, MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { AigDossierListTableComponent } from './components/dossier-list-table/dossier-list-table.component';
import { AigDossierNewUpdateFormComponent } from './components/dossier-new-update-form/dossier-new-update-form.component';
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
import { DossierResolver } from './resolver/dossier.resolver';
import { AigIppAutocompleteService } from './service/autocomplete-filter.service';
import { AigIppAutocompleteDisplayService } from './service/autocomplete-display.service';
import { CommonGenericModule } from '../generic/common-generic.module';
import { ProcurementResolver } from './resolver/procurement.resolver';
import { ProcurementLotResolver } from './resolver/procurement-lot.resolver';
import { AigDesignatedCompanyListTableComponent } from './components/designated-company-list-table/designated-company-list-table.component';
import { AigDesignatedCompanyNewUpdateFormComponent } from './components/designated-company-new-update-form/designated-company-new-update-form.component';
import { DesignatedCompanyResolver } from './resolver/designated-company.resolver';
import { AigCommerceAutocompleteDisplayService } from '../commerce/service/autocomplete-display.service';
import { PartecipationStatusResolver } from './resolver/partecipation-status.resolver';
import { PartecipationResolver } from './resolver/partecipation.resolver';
import { PreparationResolver } from './resolver/preparation.resolver';
import { PreparationStatusResolver } from './resolver/preparation-status.resolver';
import { InsurancePolicyResolver } from './resolver/insurance-policy.resolver';
import { InsurancePolicyStatusResolver } from './resolver/insurance-policy-status.resolver';
import { AigInsurancePolicyStatusListTableComponent } from './components/insurance-policy-status-list-table/insurance-policy-status-list-table.component';
import { AigInsurancePolicyStatusNewUpdateFormComponent } from './components/insurance-policy-status-new-update-form/insurance-policy-status-new-update-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { AigProcurementDetailBoxComponent } from './components/procurement-detail-box/procurement-detail-box.component';
import { AigProcurementLotDetailBoxComponent } from './components/procurement-lot-detail-box/procurement-lot-detail-box.component';
import { AigPreparationDetailBoxComponent } from './components/preparation-detail-box/preparation-detail-box.component';
import { AigPartecipationDetailBoxComponent } from './components/partecipation-detail-box/partecipation-detail-box.component';
import { AigDesignatedCompanyDetailBoxComponent } from './components/designated-company-detail-box/designated-company-detail-box.component';
import { AigInsurancePolicyDetailBoxComponent } from './components/insurance-policy-detail-box/insurance-policy-detail-box.component';
import { AigDossierDetailBoxComponent } from './components/dossier-detail-box/dossier-detail-box.component';
import { AigPartecipationStatusDetailBoxComponent } from './components/partecipation-status-detail-box/partecipation-status-detail-box.component';
import { AigPreparationStatusDetailBoxComponent } from './components/preparation-status-detail-box/preparation-status-detail-box.component';
import { AigInsurancePolicyStatusDetailBoxComponent } from './components/insurance-policy-status-detail-box/insurance-policy-status-detail-box.component';
import { AigPartecipationModalityNewUpdateFormComponent } from './components/partecipation-modality-new-update-form/partecipation-modality-new-update-form.component';
import { AigPartecipationModalityListTableComponent } from './components/partecipation-modality-list-table/partecipation-modality-list-table.component';
import { AigPreparationModalityListTableComponent } from './components/preparation-modality-list-table/preparation-modality-list-table.component';
import { AigPreparationModalityNewUpdateFormComponent } from './components/preparation-modality-new-update-form/preparation-modality-new-update-form.component';
import { PreparationModalityResolver } from './resolver/preparation-modality.resolver';
import { PartecipationModalityResolver } from './resolver/partecipation-modality.resolver';
import { AigProcurementLotCategoryNewUpdateFormComponent } from './components/procurement-lot-category-new-update-form/procurement-lot-category-new-update-form.component';
import { AigProcurementLotCategoryListTableComponent } from './components/procurement-lot-category-list-table/procurement-lot-category-list-table.component';




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

        TranslateModule,

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
		MatCheckboxModule,
    ],
    providers: [

        DossierResolver,
        ProcurementResolver,
        AigIppAutocompleteDisplayService,
        DesignatedCompanyResolver,
        AigCommerceAutocompleteDisplayService,
        AigIppAutocompleteDisplayService,
        ProcurementLotResolver,
        PartecipationStatusResolver,
        PartecipationResolver,
        PreparationResolver,
        PreparationStatusResolver,
        InsurancePolicyResolver,
        InsurancePolicyStatusResolver,
        PreparationModalityResolver,
        PartecipationModalityResolver,

    ],
    declarations: [

        AigProcurementLotCategoryNewUpdateFormComponent,
        AigProcurementLotCategoryListTableComponent,

        AigPreparationModalityNewUpdateFormComponent,
        AigPreparationModalityListTableComponent,

        AigPartecipationModalityNewUpdateFormComponent,
        AigPartecipationModalityListTableComponent,

        AigProcurementListTableComponent,
        AigProcurementNewUpdateFormComponent,
        AigProcurementDetailBoxComponent,

        AigProcurementLotListTableComponent,
        AigProcurementLotNewUpdateFormComponent,
        AigProcurementLotDetailBoxComponent,

        AigDesignatedCompanyListTableComponent,
        AigDesignatedCompanyNewUpdateFormComponent,
        AigDesignatedCompanyDetailBoxComponent,

        AigDossierListTableComponent,
        AigDossierNewUpdateFormComponent,
        AigDossierDetailBoxComponent,

        AigPartecipationListTableComponent,
        AigPartecipationNewUpdateFormComponent,
        AigPartecipationDetailBoxComponent,

        AigPartecipationStatusListTableComponent,
        AigPartecipationStatusNewUpdateFormComponent,
        AigPartecipationStatusDetailBoxComponent,
        
        AigPreparationListTableComponent,
        AigPreparationNewUpdateFormComponent,
        AigPreparationDetailBoxComponent,

        AigPreparationStatusListTableComponent,
        AigPreparationStatusNewUpdateFormComponent,
        AigPreparationStatusDetailBoxComponent,

        AigInsurancePolicyListTableComponent,
        AigInsurancePolicyNewUpdateFormComponent,
        AigInsurancePolicyDetailBoxComponent,

        AigInsurancePolicyStatusListTableComponent,
        AigInsurancePolicyStatusNewUpdateFormComponent,
        AigInsurancePolicyStatusDetailBoxComponent,
    
    ],
    exports: [

        AigPartecipationModalityListTableComponent,
        AigPartecipationModalityNewUpdateFormComponent,

        AigProcurementLotCategoryNewUpdateFormComponent,
        AigProcurementLotCategoryListTableComponent,

        AigPreparationModalityListTableComponent,
        AigPreparationModalityNewUpdateFormComponent,

        AigProcurementListTableComponent,
        AigProcurementNewUpdateFormComponent,
        AigProcurementDetailBoxComponent,

        AigProcurementLotListTableComponent,
        AigProcurementLotNewUpdateFormComponent,
        AigProcurementLotDetailBoxComponent,

        AigDesignatedCompanyListTableComponent,
        AigDesignatedCompanyNewUpdateFormComponent,
        AigDesignatedCompanyDetailBoxComponent,

        AigDossierListTableComponent,
        AigDossierNewUpdateFormComponent,
        AigDossierDetailBoxComponent,

        AigPartecipationListTableComponent,
        AigPartecipationNewUpdateFormComponent,
        AigPartecipationDetailBoxComponent,

        AigPartecipationStatusListTableComponent,
        AigPartecipationStatusNewUpdateFormComponent,
        AigPartecipationStatusDetailBoxComponent,

        AigPreparationListTableComponent,
        AigPreparationNewUpdateFormComponent,
        AigPreparationDetailBoxComponent,

        AigPreparationStatusListTableComponent,
        AigPreparationStatusNewUpdateFormComponent,
        AigPreparationStatusDetailBoxComponent,

        AigInsurancePolicyListTableComponent,
        AigInsurancePolicyNewUpdateFormComponent,
        AigInsurancePolicyDetailBoxComponent,

        AigInsurancePolicyStatusListTableComponent,
        AigInsurancePolicyStatusNewUpdateFormComponent,
        AigInsurancePolicyStatusDetailBoxComponent,

    ]
        
    
})
export class AigCommonIppModule {}