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

@NgModule({
    declarations: [
        AigStandardHeaderComponent,

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
    ],
    exports: [],
    providers: [],
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
    ],
})
export class AigStandardModule {}