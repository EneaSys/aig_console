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
import { FuseSharedModule } from '@fuse/shared.module';
import { MatPaginatorModule, MatDatepickerModule, MatSliderModule, MatCardModule, MatList, MatListModule, MatSlideToggleModule, MatSelectModule, MatMenuModule, MatTabsModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper'; 

import { AgmCoreModule } from '@agm/core';
import { AigProcurementDetailPageComponent } from './components/procurement-detail-page/procurement-detail-page.component';
import { AigProcurementNewUpdateDialogComponent } from './components/procurement-new-update-dialog/procurement-new-update-dialog.component';
import { AigProcurementLotDetailPageComponent } from './components/procurement-lot-detail-page/procurement-lot-detail-page.component';
import { AigProcurementLotNewUpdateDialogComponent } from './components/procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component';
import { AigProcurementLotListPageComponent } from './components/procurement-lot-list-page/procurement-lot-list-page.component';
import { AigDossierNewUpdateDialogComponent } from './components/dossier-new-update-dialog/dossier-new-update-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AigDossierListPageComponent } from './components/dossier-list-page/dossier-list-page.component';
import { AigItalianLegislationApiModule } from 'aig-italianlegislation';

import { AigPartecipationNewUpdateDialogComponent } from './components/partecipation-new-update-dialog/partecipation-new-update-dialog.component';
import { AigPartecipationDetailPageComponent } from './components/partecipation-detail-page/partecipation-detail-page.component';
import { AigDossierDetailPageComponent } from './components/dossier-detail-page/dossier-detail-page.component';

import { AigPartecipationStatusNewUpdateDialogComponent } from './components/partecipation-status-new-update-dialog/partecipation-status-new-update-dialog.component';
import { AigPartecipationStatusDetailPageComponent } from './components/partecipation-status-detail-page/partecipation-status-detail-page.component';
import { AigPreparationNewUpdateDialogComponent } from './components/preparation-new-update-dialog/preparation-new-update-dialog.component';
import { AigPreparationDetailPageComponent } from './components/preparation-detail-page/preparation-detail-page.component';
import { AigPreparationStatusNewUpdateDialogComponent } from './components/preparation-status-new-update-dialog/preparation-status-new-update-dialog.component';
import { AigPreparationStatusDetailPageComponent } from './components/preparation-status-detail-page/preparation-status-detail-page.component';
import { AigInsurancePolicyListPageComponent } from './components/insurance-policy-list-page/insurance-policy-list-page.component';
import { AigInsurancePolicyNewUpdateDialogComponent } from './components/insurance-policy-new-update-dialog/insurance-policy-new-update-dialog.component';
import { AigInsurancePolicyDetailPageComponent } from './components/insurance-policy-detail-page/insurance-policy-detail-page.component';
import { AigProcurementListPageComponent } from './components/procurement-list-page/procurement-list-page.component';
import { AigPartecipationListPageComponent } from './components/partecipation-list-page/partecipation-list-page.component';
import { AigPartecipationStatusListPageComponent } from './components/partecipation-status-list-page/partecipation-status-list-page.component';
import { AigPreparationListPageComponent } from './components/preparation-list-page/preparation-list-page.component';
import { AigPreparationStatusListPageComponent } from './components/preparation-status-list-page/preparation-status-list-page.component';
import { AigDesignatedCompanyListPageComponent } from './components/designated-company-list-page/designated-company-list-page.component';
import { AigDesignatedCompanyNewUpdateDialogComponent } from './components/designated-company-new-update-dialog/designated-company-new-update-dialog.component';
import { AigDesignatedCompanyDetailPageComponent } from './components/designated-company-detail-page/designated-company-detail-page.component';
import { AigInsurancePolicyStatusNewUpdateDialogComponent } from './components/insurance-policy-status-new-update-dialog/insurance-policy-status-new-update-dialog.component';
import { AigInsurancePolicyStatusListPageComponent } from './components/insurance-policy-status-list-page/insurance-policy-status-list-page.component';
import { AigInsurancePolicyStatusDetailPageComponent } from './components/insurance-policy-status-detail-page/insurance-policy-status-detail-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonGenericModule } from 'aig-common/modules/generic/common-generic.module';
import { AigPartecipationModalityListPageComponent } from './components/partecipation-modality-list-page/partecipation-modality-list-page.component';
import { AigPartecipationModalityNewUpdateDialogComponent } from './components/partecipation-modality-new-update-dialog/partecipation-modality-new-update-dialog.component';
import { AigPartecipationModalityDetailPageComponent } from './components/partecipation-modality-detail-page/partecipation-modality-detail-page.component';
import { AigPreparationModalityDetailPageComponent } from './components/preparation-modality-detail-page/preparation-modality-detail-page.component';
import { AigPreparationModalityListPageComponent } from './components/preparation-modality-list-page/preparation-modality-list-page.component';
import { AigPreparationModalityNewUpdateDialogComponent } from './components/preparation-modality-new-update-dialog/preparation-modality-new-update-dialog.component';
import { AigProcurementLotCategoryNewUpdateDialogComponent } from './components/procurement-lot-category-new-update-dialog/procurement-lot-category-new-update-dialog.component';
import { AgalItalianLegislationModule } from '@agal-italianlegislation/agal-italianlegislation.module';
import { AigConsorzioManagerPageComponent } from './components/consorzio-manager-page/consorzio-manager-page.component';
import { AigEntityManagerApiModule } from 'aig-entity-manager';
import { AigProcurementComplexNewDialogComponent } from './components/procurement-complex-new-dialog/procurement-complex-new-dialog.component';



@NgModule({
	imports: [
		RouterModule.forChild(ippRoute),

		CommonModule,
		AigCommonIppModule,
		AigItalianLegislationApiModule,
		CommonGenericModule,
		AgalItalianLegislationModule,
		AigEntityManagerApiModule,

		FormsModule,
		ReactiveFormsModule,

		FuseSharedModule,
		FuseSidebarModule,

		TranslateModule,

		MatIconModule,
		MatTabsModule,
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
		MatStepperModule,



		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyALOoLRTrkbbyx1rC932uBL1Hz-dKIEN8E',
			libraries: ['places', 'drawing', 'geometry']
		}),
	],
	providers: [

	],
	declarations: [
		AigIppHeaderComponent,

		AigConsorzioManagerPageComponent,

		AigPreparationModalityListPageComponent,
		AigPreparationModalityNewUpdateDialogComponent,
		AigPreparationModalityDetailPageComponent,

		AigProcurementLotCategoryNewUpdateDialogComponent,
		AigProcurementComplexNewDialogComponent,

		AigPartecipationModalityListPageComponent,
		AigPartecipationModalityNewUpdateDialogComponent,
		AigPartecipationModalityDetailPageComponent,

		AigProcurementListPageComponent,
		AigProcurementLotListPageComponent,
		AigDossierListPageComponent,
		AigPartecipationListPageComponent,
		AigPartecipationStatusListPageComponent,
		AigPreparationListPageComponent,
		AigPreparationStatusListPageComponent,
		AigInsurancePolicyListPageComponent,
		AigDesignatedCompanyListPageComponent,
		AigInsurancePolicyStatusListPageComponent,



		AigProcurementNewUpdateDialogComponent,
		AigProcurementLotNewUpdateDialogComponent,
		AigDossierNewUpdateDialogComponent,
		AigPartecipationNewUpdateDialogComponent,
		AigPartecipationStatusNewUpdateDialogComponent,
		AigPreparationNewUpdateDialogComponent,
		AigPreparationStatusNewUpdateDialogComponent,
		AigInsurancePolicyNewUpdateDialogComponent,
		AigDesignatedCompanyNewUpdateDialogComponent,
		AigInsurancePolicyStatusNewUpdateDialogComponent,

		AigPartecipationDetailPageComponent,
		AigDossierDetailPageComponent,
		AigPartecipationStatusDetailPageComponent,
		AigProcurementDetailPageComponent,
		AigProcurementLotDetailPageComponent,
		AigPreparationDetailPageComponent,
		AigPreparationStatusDetailPageComponent,
		AigInsurancePolicyDetailPageComponent,
		AigDesignatedCompanyDetailPageComponent,
		AigInsurancePolicyStatusDetailPageComponent,


	],
	exports: [
		AigProcurementLotListPageComponent,

	],

	entryComponents: [
		AigPartecipationModalityNewUpdateDialogComponent,
		AigPreparationModalityNewUpdateDialogComponent,
		AigProcurementLotCategoryNewUpdateDialogComponent,
		AigProcurementComplexNewDialogComponent,

		AigProcurementNewUpdateDialogComponent,
		AigProcurementLotNewUpdateDialogComponent,
		AigDossierNewUpdateDialogComponent,
		AigPartecipationNewUpdateDialogComponent,
		AigPartecipationStatusNewUpdateDialogComponent,
		AigPreparationNewUpdateDialogComponent,
		AigPreparationStatusNewUpdateDialogComponent,
		AigInsurancePolicyNewUpdateDialogComponent,
		AigDesignatedCompanyNewUpdateDialogComponent,
		AigInsurancePolicyStatusNewUpdateDialogComponent,

	],
})
export class AigIppModule { }