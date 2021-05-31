import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';

import { aigStandardRoute } from './aig-standard.route';
import { AigStandardClientModule } from 'aig-standard';

import { AigCommonStandardModule } from 'aig-common/modules/standard/common-standard.module';

import { AigStandardHeaderComponent } from './components/standard-header/standard-header.component';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';
import { AigCityDetailPageComponent } from './components/city-detail-page/city-detail-page.component';
import { AigCityNewUpdateModalComponent } from './components/city-new-update-modal/city-new-update-modal.component';
import { AigCpvListPageComponent } from './components/cpv-list-page/cpv-list-page.component';
import { AigCpvNewUpdateModalComponent } from './components/cpv-new-update-modal/cpv-new-update-modal.component';
import { AigCpvDetailPageComponent } from './components/cpv-detail-page/cpv-detail-page.component';
import { AigSocialActionListPageComponent } from './components/social-action-list-page/social-action-list-page.component';
import { AigSocialActionDetailPageComponent } from './components/social-action-detail/social-action-detail.component';
import { AigSocialActionNewUpdateModalComponent } from './components/social-action-new-update-modal/social-action-new-update-modal.component';
import { AigSocialListPageComponent } from './components/social-list-page/social-list-page.component';
import { AigSocialDetailPageComponent } from './components/social-detail-page/social-detail-page.component';
import { AigSocialNewUpdateModalComponent } from './components/social-new-update-modal/social-new-update-modal.component';
import { AigIppLotCategoryListPageComponent } from './components/ipp-lot-category-list-page/ipp-lot-category-list-page.component';
import { AigIppLotTypeListPageComponent } from './components/ipp-lot-type-list-page/ipp-lot-type-list-page.component';
import { AigIppModalityListPageComponent } from './components/ipp-modality-list-page/ipp-modality-list-page.component';
import { AigIppProcedureListPageComponent } from './components/ipp-procedure-list-page/ipp-procedure-list-page.component';
import { AigIppSectorListPageComponent } from './components/ipp-sector-list-page/ipp-sector-list-page.component';
import { AigIppLotTypeDetailPageComponent } from './components/ipp-lot-type-detail-page/ipp-lot-type-detail-page.component';
import { AigIppLotTypeNewUpdateModalComponent } from './components/ipp-lot-type-new-update-modal/ipp-lot-type-new-update-modal.component';
import { AigIppModalityDetailPageComponent } from './components/ipp-modality-detail-page/ipp-modality-detail-page.component';
import { AigIppModalityNewUpdateModalComponent } from './components/ipp-modality-new-update-modal/ipp-modality-new-update-modal.component';
import { AigIppProcedureDetailPageComponent } from './components/ipp-procedure-detail-page/ipp-procedure-detail-page.component';
import { AigIppProcedureNewUpdateModalComponent } from './components/ipp-procedure-new-update-modal/ipp-procedure-new-update-modal.component';
import { AigIppSectorDetailPageComponent } from './components/ipp-sector-detail-page/ipp-sector-detail-page.component';
import { AigIppSectorNewUpdateModalComponent } from './components/ipp-sector-new-update-modal/ipp-sector-new-update-modal.component';
import { AigLotCategoryDetailPageComponent } from './components/ipp-lot-category-detail-page/lot-category-detail-page.component';
import { AigLotCategoryNewUpdateModalComponent } from './components/ipp-lot-category-new-update-modal/lot-category-new-update-modal.component';
import { AigStandardCustomListPageComponent } from './components/standard-custom-list-page/standard-custom-list-page.component';
import { AigRegimeFiscaleListPageComponent } from './components/regime-fiscale-list-page/regime-fiscale-list-page.component';
import { AigRegimeFiscaleDetailPageComponent } from './components/regime-fiscale-detail-page/regime-fiscale-detail-page.component';
import { AigRegimeFiscaleNewUpdateDialogComponent } from './components/regime-fiscale-new-update-dialog/regime-fiscale-new-update-dialog.component';
import { AigTipoCassaListPageComponent } from './components/tipo-cassa-list-page/tipo-cassa-list-page.component';
import { AigTipoCassaDetailPageComponent } from './components/tipo-cassa-detail-page/tipo-cassa-detail-page.component';
import { AigTipoCassaNewUpdateDialogComponent } from './components/tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigNaturaListPageComponent } from './components/natura-list-page/natura-list-page.component';
import { AigNaturaDetailPageComponent } from './components/natura-detail-page/natura-detail-page.component';
import { AigNaturaNewUpdateDialogComponent } from './components/natura-new-update-dialog/natura-new-update-dialog.component';
import { AigTipoRitenutaListPageComponent } from './components/tipo-ritenuta-list-page/tipo-ritenuta-list-page.component';
import { AigTipoRitenutaDetailPageComponent } from './components/tipo-ritenuta-detail-page/tipo-ritenuta-detail-page.component';
import { AigTipoRitenutaNewUpdateDialogComponent } from './components/tipo-ritenuta-new-update-dialog/tipo-ritenuta-new-update-dialog.component';
import { AigTipoCessionePrestazioneListPageComponent } from './components/tipo-cessione-prestazione-list-page/tipo-cessione-prestazione-list-page.component';
import { AigTipoCessionePrestazioneDetailPageComponent } from './components/tipo-cessione-prestazione-detail-page/tipo-cessione-prestazione-detail-page.component';
import { AigTipoCessionePrestazioneNewUpdateDialogComponent } from './components/tipo-cessione-prestazione-new-update-dialog/tipo-cessione-prestazione-new-update-dialog.component';
import { AigTipoScontoMaggiorazioneListPageComponent } from './components/tipo-sconto-maggiorazione-list-page/tipo-sconto-maggiorazione-list-page.component';


import { AigEsigibilitaIvaListPageComponent } from './components/esigibilita-iva-list-page/esigibilita-iva-list-page.component';
import { AigTipoScontoMaggiorazioneNewUpdateDialogComponent } from './components/tipo-sconto-maggiorazione-new-update-dialog/tipo-sconto-maggiorazione-new-update-dialog.component';
import { AigTipoScontoMaggiorazioneDetailPageComponent } from './components/tipo-sconto-maggiorazione-detail-page/tipo-sconto-maggiorazione-detail-page.component';
import { AigEsigibilitaIvaDetailPageComponent } from './components/esigibilita-iva-detail-page/esigibilita-iva-detail-page.component';
import { AigEsigibilitaIvaNewUpdateDialogComponent } from './components/esigibilita-iva-new-update-dialog/esigibilita-iva-new-update-dialog.component';
import { AigModalitaPagamentoListPageComponent } from './components/modalita-pagamento-list-page/modalita-pagamento-list-page.component';
import { AigModalitaPagamentoDetailPageComponent } from './components/modalita-pagamento-detail-page/modalita-pagamento-detail-page.component';
import { AigModalitaPagamentoNewUpdateDialogComponent } from './components/modalita-pagamento-new-update-dialog/modalita-pagamento-new-update-dialog.component';
import { AigAwardCriterionNewUpdateDialogComponent } from './components/award-criterion-new-update-dialog/award-criterion-new-update-dialog.component';
import { AigAwardCriterionListPageComponent } from './components/award-criterion-list-page/award-criterion-list-page.component';
import { AigAwardCriterionDetailPageComponent } from './components/award-criterion-detail-page/award-criterion-detail-page.component';
import { AigPartecipationTypeNewUpdateDialogComponent } from './components/partecipation-type-new-update-dialog/partecipation-type-new-update-dialog.component';
import { AigPartecipationTypeListPageComponent } from './components/partecipation-type-list-page/partecipation-type-list-page.component';
import { AigPartecipationTypeDetailPageComponent } from './components/partecipation-type-detail-page/partecipation-type-detail-page.component';
import { AigProcurementStatusListPageComponent } from './components/procurement-status-list-page/procurement-status-list-page.component';
import { AigProcurementStatusNewUpdateDialogComponent } from './components/procurement-status-new-update-dialog/procurement-status-new-update-dialog.component';
import { AigProcurementStatusDetailPageComponent } from './components/procurement-status-detail-page/procurement-status-detail-page.component';
import { AigProcurementLotStatusListPageComponent } from './components/procurement-lot-status-list-page/procurement-lot-status-list-page.component';
import { AigProcurementLotStatusNewUpdateDialogComponent } from './components/procurement-lot-status-new-update-dialog/procurement-lot-status-new-update-dialog.component';
import { AigProcurementLotStatusDetailPageComponent } from './components/procurement-lot-status-detail-page/procurement-lot-status-detail-page.component';



@NgModule({
    declarations: [
        AigStandardHeaderComponent,

        AigStandardCustomListPageComponent,


        AigProcurementLotStatusListPageComponent,
        AigProcurementLotStatusNewUpdateDialogComponent,
        AigProcurementLotStatusDetailPageComponent,

        AigProcurementStatusListPageComponent,
        AigProcurementStatusNewUpdateDialogComponent,
        AigProcurementStatusDetailPageComponent,

        AigAwardCriterionListPageComponent,
        AigAwardCriterionNewUpdateDialogComponent,
        AigAwardCriterionDetailPageComponent,

        AigPartecipationTypeNewUpdateDialogComponent,
        AigPartecipationTypeListPageComponent,
        AigPartecipationTypeDetailPageComponent,

        AigCityListPageComponent,
        AigCityDetailPageComponent,
        AigCityNewUpdateModalComponent,

        AigSocialListPageComponent,
        AigSocialActionListPageComponent,
        AigSocialDetailPageComponent,
        AigSocialNewUpdateModalComponent,

        AigCpvListPageComponent,
        AigCpvNewUpdateModalComponent,
        AigCpvDetailPageComponent,

        AigIppModalityListPageComponent,
        AigIppProcedureListPageComponent,
        AigIppSectorListPageComponent,

        AigIppLotTypeListPageComponent,
        AigIppLotTypeDetailPageComponent,
        AigIppLotTypeNewUpdateModalComponent,

        AigIppLotCategoryListPageComponent,
        AigLotCategoryDetailPageComponent,
        AigLotCategoryNewUpdateModalComponent,

        AigIppModalityDetailPageComponent,
        AigIppModalityNewUpdateModalComponent,

        AigIppProcedureDetailPageComponent,
        AigIppProcedureNewUpdateModalComponent,

        AigIppSectorDetailPageComponent,
        AigIppSectorNewUpdateModalComponent,

        AigSocialActionDetailPageComponent,
        AigSocialActionNewUpdateModalComponent,
        AigRegimeFiscaleListPageComponent,
        AigRegimeFiscaleDetailPageComponent,
        AigRegimeFiscaleNewUpdateDialogComponent,
        AigTipoCassaListPageComponent,
        AigTipoCassaDetailPageComponent,
        AigTipoCassaNewUpdateDialogComponent,
        AigNaturaListPageComponent,
        AigNaturaDetailPageComponent,
        AigNaturaNewUpdateDialogComponent,
        AigTipoRitenutaListPageComponent,
        AigTipoRitenutaDetailPageComponent,
        AigTipoRitenutaNewUpdateDialogComponent,
        AigTipoCessionePrestazioneListPageComponent,
        AigTipoCessionePrestazioneDetailPageComponent,
        AigTipoCessionePrestazioneNewUpdateDialogComponent,
        AigTipoScontoMaggiorazioneListPageComponent,
        AigTipoScontoMaggiorazioneDetailPageComponent,
        AigTipoScontoMaggiorazioneNewUpdateDialogComponent,
        AigEsigibilitaIvaListPageComponent,
        AigEsigibilitaIvaDetailPageComponent,
        AigEsigibilitaIvaNewUpdateDialogComponent,
        AigModalitaPagamentoListPageComponent,
        AigModalitaPagamentoDetailPageComponent,
        AigModalitaPagamentoNewUpdateDialogComponent

    ],
    imports: [
        RouterModule.forChild(aigStandardRoute),
        CommonModule,

        FlexLayoutModule,
        FuseSidebarModule,
        FuseSharedModule,

        AigCommonStandardModule,
        AigStandardClientModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTabsModule,
    ],
    exports: [],
    providers: [
    ],
    entryComponents: [
        AigSocialNewUpdateModalComponent,
        AigSocialActionNewUpdateModalComponent,
        AigCityNewUpdateModalComponent,
        AigCpvNewUpdateModalComponent,
        AigIppLotTypeNewUpdateModalComponent,
        AigIppModalityNewUpdateModalComponent,
        AigIppProcedureNewUpdateModalComponent,
        AigIppSectorNewUpdateModalComponent,
        AigLotCategoryNewUpdateModalComponent,
        AigRegimeFiscaleNewUpdateDialogComponent,
        AigTipoCassaNewUpdateDialogComponent,
        AigNaturaNewUpdateDialogComponent,
        AigTipoRitenutaNewUpdateDialogComponent,
        AigTipoCessionePrestazioneNewUpdateDialogComponent,
        AigTipoScontoMaggiorazioneNewUpdateDialogComponent,
        AigEsigibilitaIvaNewUpdateDialogComponent,
        AigModalitaPagamentoNewUpdateDialogComponent,
        AigAwardCriterionNewUpdateDialogComponent,
        AigProcurementStatusNewUpdateDialogComponent,
        AigPartecipationTypeNewUpdateDialogComponent,
        AigProcurementStatusNewUpdateDialogComponent,
        AigProcurementLotStatusNewUpdateDialogComponent,

      
    
    ],
})
export class AigStandardModule {}