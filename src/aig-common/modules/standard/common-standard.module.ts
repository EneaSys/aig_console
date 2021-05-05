import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { FuseSidebarModule } from '@fuse/components';

import { AigCommonModule } from 'aig-common/common.module';

import { AigSocialListTableComponent } from './components/social/social-list-table/social-list-table.component';
import { AigSocialNewUpdateFormComponent } from './components/social/social-new-update-form/social-new-update-form.component';
import { AigSocialActionListTableComponent } from './components/social-action/social-action-list-table/social-action-list-table.component';
import { AigSocialActionNewUpdateFormComponent } from './components/social-action/social-action-new-update-form/social-action-new-update-form.component';
import { AigCityNewUpdateFormComponent } from "./components/city/city-new-update-form/city-new-update-form.component";
import { AigCityListTableComponent } from './components/city/city-list-table/city-list-table.component';
import { AigCpvListTableComponent } from './components/cpv/cpv-list-table/cpv-list-table.component';
import { AigCpvNewUpdateFormComponent } from './components/cpv/cpv-new-update-form/cpv-new-update-form.component';
import { AigIppModalityNewUpdateFormComponent } from './components/ipp-modality/ipp-modality-new-update-form/ipp-modality-new-update-form.component';
import { AigIppModalityListTableComponent } from './components/ipp-modality/ipp-modality-list-table/ipp-modality-list-table.component';
import { AigIppProcedureListTableComponent } from './components/ipp-procedure/ipp-procedure-list-table/ipp-procedure-list-table.component';
import { AigIppProcedureNewUpdateFormComponent } from "./components/ipp-procedure/ipp-procedure-new-update-form/ipp-procedure-new-update-form.component";
import { AigIppSectorNewUpdateFormComponent } from './components/ipp-sector/ipp-sector-new-update-form/ipp-sector-new-update-form.component';
import { AigIppSectorListTableComponent } from './components/ipp-sector/ipp-sector-list-table/ipp-sector-list-table.component';
import { AigIppLotTypeNewUpdateFormComponent } from './components/ipp-lot-type/ipp-lot-type-new-update-form/ipp-lot-type-new-update-form.component';
import { AigIppLotTypeListTableComponent } from './components/ipp-lot-type/ipp-lot-type-list-table/ipp-lot-type-list-table.component';
import { AigLotCategoryNewUpdateFormComponent } from './components/ipp-lot-category/lot-category-new-update-form/lot-category-new-update-form.component';
import { AigLotCategoryListTableComponent } from './components/ipp-lot-category/lot-category-list-table/lot-category-list-table.component';

import { SocialResolver } from "./resolver/social.resolver";
import { CityResolver } from './resolver/city.resolver';
import { CpvResolver } from './resolver/cpv.resolver';
import { SectorResolver } from "./resolver/sector.resolver";
import { IppProcedureResolver } from "./resolver/procedure.resolver";
import { IppModalityResolver } from "./resolver/ipp-modality.resolver";
import { LotResolver } from "./resolver/lot.resolver";
import { CategoryResolver } from "./resolver/category.resolver";

import { AigStandardAutocompleteFilterService } from './services/autocomplete-filter.service';
import { ItFiscalCodeService } from './services/itFiscalCode.service';
import { ContextModuleResolver } from './resolver/context-module.resolver';
import { MatMenuModule } from '@angular/material';
import { AigEntityDetailCityComponent } from './components/entity-detail-city/entity-detail-city.component';
import { AigEntityDetailSocialComponent } from './components/entity-detail-social/entity-detail-social.component';
import { AigEntityDetailCpvComponent } from './components/entity-detail-cpv/entity-detail-cpv.component';
import { AigEntityDetailIppLotTypeComponent } from './components/entity-detail-ipp-lot-type/entity-detail-ipp-lot-type.component';
import { AigEntityDetailIppLotCategoryComponent } from './components/entity-detail-ipp-lot-category/entity-detail-ipp-lot-category.component';
import { AigEntityDetailIppModalityComponent } from './components/entity-detail-ipp-modality/entity-detail-ipp-modality.component';
import { AigEntityDetailIppProcedureComponent } from './components/entity-detail-ipp-procedure/entity-detail-ipp-procedure.component';
import { AigEntityDetailIppSectorComponent } from './components/entity-detail-ipp-sector/entity-detail-ipp-sector.component';
import { AigRegimeFiscaleListTableComponent } from './components/regime-fiscale-list-table/regime-fiscale-list-table.component';
import { AigRegimeFiscaleNewUpdateFormComponent } from './components/regime-fiscale-new-update-form/regime-fiscale-new-update-form.component';
import { RegimeFiscaleResolver } from './resolver/regime-fiscale.resolver.ts/regime-fiscale.resolver';
import { AigEntityDetailRegimeFiscaleComponent } from './components/entity-detail-regime-fiscale/entity-detail-regime-fiscale.component';
import { AigTipoCassaListTableComponent } from './components/tipo-cassa-list-table/tipo-cassa-list-table.component';
import { AigTipoCassaDetailPageComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-cassa-detail-page/tipo-cassa-detail-page.component';
import { AigTipoCassaNewUpdateFormComponent } from './components/tipo-cassa-new-update-form/tipo-cassa-new-update-form.component';

import { TipoCassaResolver } from './resolver/tipo-cassa.resolver.ts/tipo-cassa.resolver';
import { AigEntityDetailTipoCassaComponent } from './components/entity-detail-tipo-cassa/entity-detail-tipo-cassa.component';
import { NaturaResolver } from './resolver/natura.resolver.ts/natura.resolver';
import { AigNaturaListTableComponent } from './components/natura-list-table/natura-list-table.component';
import { AigEntityDetailNaturaComponent } from './components/entity-detail-natura/entity-detail-natura.component';
import { AigNaturaNewUpdateFormComponent } from './components/natura-new-update-form/natura-new-update-form.component';
import { AigTipoRitenutaListTableComponent } from './components/tipo-ritenuta-list-table/tipo-ritenuta-list-table.component';
import { AigTipoRitenutaNewUpdateFormComponent } from './components/tipo-ritenuta-new-update-form/tipo-ritenuta-new-update-form.component';
import { TipoRitenutaResolver } from './resolver/tipo-ritenuta.resolver.ts/tipo-ritenuta.resolver';
import { AigEntityDetailTipoRitenutaComponent } from './components/entity-detail-tipo-ritenuta/entity-detail-tipo-ritenuta.component';
import { AigTipoCessionePrestazioneListTableComponent } from './components/tipo-cessione-prestazione-list-table/tipo-cessione-prestazione-list-table.component';
import { AigTipoCessionePrestazioneNewUpdateFormComponent } from './components/tipo-cessione-prestazione-new-update-form/tipo-cessione-prestazione-new-update-form.component';
import { AigEntityDetailTipoCessionePrestazioneComponent } from './components/entity-detail-tipo-cessione-prestazione/entity-detail-tipo-cessione-prestazione.component';
import { TipoCessionePestazioneResolver } from './resolver/tipo-cessione-prestazione.resolver.ts/tipo-cessione-prestazione.resolver';
import {  AigTipoScontoMaggiorazioneListTableComponent } from './components/tipo-sconto-maggiorazione-list-table/tipo-sconto-maggiorazione-list-table.component';
import {  AigTipoScontoMaggiorazioneNewUpdateFormComponent } from './components/tipo-sconto-maggiorazione-new-update-form/tipo-sconto-maggiorazione-new-update-form.component';
import {  AigEntityDetailTipoScontoMaggiorazioneComponent } from './components/entity-detail-tipo-sconto-maggiorazione/entity-detail-tipo-sconto-maggiorazione.component';
import {  TipoScontoMaggiorazioneResolver } from './resolver/tipo-sconto-maggiorazione.resolver.ts/tipo-sconto-maggiorazione.resolver';
import { AigEsigibilitaIvaListTableComponent } from './components/esigibilita-iva-list-table/esigibilita-iva-list-table.component';
import { AigEsigibilitaIvaNewUpdateFormComponent } from './components/esigibilita-iva-new-update-form/esigibilita-iva-new-update-form.component';
import { AigEntityDetailEsigibilitaIvaComponent } from './components/entity-detail-esigibilita-iva/entity-detail-esigibilita-iva.component';
import { EsigibilitaIvaResolver } from './resolver/esigibilita-iva.resolver.ts/esigibilita-iva.resolver';
import { AigModalitaPagamentoNewUpdateFormComponent } from './components/modalita-pagamento-new-update-form/modalita-pagamento-new-update-form.component';
import { AigModalitaPagamentoListTableComponent } from './components/modalita-pagamento-list-table/modalita-pagamento-list-table.component';
import { AigEntityDetailModalitaPagamentoComponent } from './components/entity-detail-modalita-pagamento/entity-detail-modalita-pagamento.component';
import { ModalitaPagamentoResolver } from './resolver/modalita-pagamento.resolver.ts/modalita-pagamento.resolver';
import { AigStandardAutocompleteDisplayService } from './services/autocomplete-function.service';
import { SocialActionResolver } from './resolver/social-action.resolver';
import { AigAwardCriterionListTableComponent } from './components/award-criterion-list-table/award-criterion-list-table.component';
import { AigAwardCriterionNewUpdateFormComponent } from './components/award-criterion-new-update-form/award-criterion-new-update-form.component';
import { AwardCriterionResolver } from './resolver/award-criterion.resolver';
import { AigPartecipationTypeNewUpdateFormComponent } from './components/partecipation-type-new-update-form/partecipation-type-new-update-form.component';
import { AigPartecipationTypeListTableComponent } from './components/partecipation-type-list-table/partecipation-type-list-table.component';
import { PartecipationTypeResolver } from './resolver/partecipation-type.resolver';
import { AigIlPpProcurementStatusNewUpdateFormComponent } from './components/il-pp-procurement-status-new-update-form/il-pp-procurement-status-new-update-form.component';


@NgModule({
    declarations: [

        AigSocialListTableComponent,
        AigSocialNewUpdateFormComponent,

        AigPartecipationTypeNewUpdateFormComponent,
        AigPartecipationTypeListTableComponent,

        AigAwardCriterionListTableComponent,
        AigAwardCriterionNewUpdateFormComponent,

        AigSocialActionListTableComponent,
        AigSocialActionNewUpdateFormComponent,
        
        AigCityListTableComponent,
        AigCityNewUpdateFormComponent,

        AigCpvListTableComponent,
        AigCpvNewUpdateFormComponent,

        AigIppModalityNewUpdateFormComponent,
        AigIppModalityListTableComponent,

        AigIppProcedureListTableComponent,
        AigIppProcedureNewUpdateFormComponent,

        AigIppSectorNewUpdateFormComponent,
        AigIppSectorListTableComponent,

        AigIppLotTypeNewUpdateFormComponent,
        AigIppLotTypeListTableComponent,
        

        AigLotCategoryNewUpdateFormComponent,
        AigLotCategoryListTableComponent,
        AigEntityDetailCityComponent,
        AigEntityDetailSocialComponent,
        AigEntityDetailCpvComponent,
        AigEntityDetailIppLotTypeComponent,
        AigEntityDetailIppLotCategoryComponent,
        AigEntityDetailIppModalityComponent,
        AigEntityDetailIppProcedureComponent,
        AigEntityDetailIppSectorComponent,
        AigRegimeFiscaleListTableComponent,
        AigRegimeFiscaleNewUpdateFormComponent,
        AigEntityDetailRegimeFiscaleComponent,
        AigTipoCassaListTableComponent,
        AigTipoCassaNewUpdateFormComponent,
        AigEntityDetailTipoCassaComponent,
        AigNaturaListTableComponent,
        AigEntityDetailNaturaComponent,
        AigNaturaNewUpdateFormComponent,
        AigTipoRitenutaListTableComponent,
        AigTipoRitenutaNewUpdateFormComponent,
        AigEntityDetailTipoRitenutaComponent,
        AigTipoCessionePrestazioneListTableComponent,
        AigTipoCessionePrestazioneNewUpdateFormComponent,
        AigEntityDetailTipoCessionePrestazioneComponent,
        AigTipoScontoMaggiorazioneListTableComponent,
        
        AigEntityDetailTipoScontoMaggiorazioneComponent,
        AigEsigibilitaIvaListTableComponent,
        AigEsigibilitaIvaNewUpdateFormComponent,
        AigEntityDetailEsigibilitaIvaComponent,
        AigTipoScontoMaggiorazioneNewUpdateFormComponent,
        AigModalitaPagamentoNewUpdateFormComponent,
        AigModalitaPagamentoListTableComponent,
        AigEntityDetailModalitaPagamentoComponent,

        AigIlPpProcurementStatusNewUpdateFormComponent,


    ],
    imports: [ 
        RouterModule,

        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        
        FuseSidebarModule,
        FlexLayoutModule,

        AigCommonModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatMenuModule,
        
    ],
    exports: [

        AigSocialListTableComponent,
        AigSocialNewUpdateFormComponent,

        AigPartecipationTypeNewUpdateFormComponent,
        AigPartecipationTypeListTableComponent,

        AigAwardCriterionListTableComponent,
        AigAwardCriterionNewUpdateFormComponent,

        AigSocialActionListTableComponent,
        AigSocialActionNewUpdateFormComponent,

        AigCityListTableComponent,
        AigCityNewUpdateFormComponent,

        AigCpvListTableComponent,
        AigCpvNewUpdateFormComponent,
        
        AigIppModalityListTableComponent,
        AigIppModalityNewUpdateFormComponent,

        AigIppSectorListTableComponent,
        AigIppSectorNewUpdateFormComponent,

        AigIppLotTypeListTableComponent,
        AigIppLotTypeNewUpdateFormComponent,

        AigIppProcedureListTableComponent,
        AigIppProcedureNewUpdateFormComponent,

        AigLotCategoryListTableComponent,
        AigLotCategoryNewUpdateFormComponent,
        AigEntityDetailCityComponent,
        AigEntityDetailSocialComponent,
        AigEntityDetailCpvComponent,
        AigEntityDetailIppLotTypeComponent,
        AigEntityDetailIppLotCategoryComponent,
        AigEntityDetailIppModalityComponent,
        AigEntityDetailIppProcedureComponent,
        AigEntityDetailIppSectorComponent,
        AigRegimeFiscaleListTableComponent,
        AigRegimeFiscaleNewUpdateFormComponent,
        AigTipoCassaListTableComponent,
        AigTipoCassaNewUpdateFormComponent,
        AigEntityDetailTipoCassaComponent,
        AigNaturaListTableComponent,
        AigEntityDetailNaturaComponent,
        AigNaturaNewUpdateFormComponent,
        AigTipoRitenutaListTableComponent,
        AigTipoRitenutaNewUpdateFormComponent,
        AigEntityDetailTipoRitenutaComponent,
        AigTipoCessionePrestazioneListTableComponent,
        AigTipoCessionePrestazioneNewUpdateFormComponent,
        AigEntityDetailTipoCessionePrestazioneComponent,
        AigTipoScontoMaggiorazioneListTableComponent,
        
        AigEntityDetailTipoScontoMaggiorazioneComponent,
        AigEsigibilitaIvaListTableComponent,
        AigEsigibilitaIvaNewUpdateFormComponent,
        AigEntityDetailEsigibilitaIvaComponent,
        AigTipoScontoMaggiorazioneNewUpdateFormComponent,
        AigModalitaPagamentoNewUpdateFormComponent,
        AigModalitaPagamentoListTableComponent,
        AigEntityDetailModalitaPagamentoComponent,

        AigIlPpProcurementStatusNewUpdateFormComponent,
   

    ],
    entryComponents: [

    ],
    providers: [
        SocialResolver,
        CityResolver,
        CpvResolver,
        SocialActionResolver,
        SectorResolver,
        IppProcedureResolver,
        IppModalityResolver,
        LotResolver,
        CategoryResolver,
        AwardCriterionResolver,
        PartecipationTypeResolver,

        ItFiscalCodeService,
        
        AigStandardAutocompleteFilterService,
        AigStandardAutocompleteDisplayService,
        ContextModuleResolver,
        RegimeFiscaleResolver,
        TipoCassaResolver,
        NaturaResolver,
        TipoRitenutaResolver,
        TipoCessionePestazioneResolver,
        TipoScontoMaggiorazioneResolver,
        EsigibilitaIvaResolver,
        ModalitaPagamentoResolver
    ],
})
export class AigCommonStandardModule {}