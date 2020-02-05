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

import { aigStandardRoute } from './aig-standard.route';
import { AigStandardClientModule  } from 'aig-standard';

import { AigCommonStandardModule } from 'aig-common/modules/standard/common-standard.module';

import { AigStandardHeaderComponent } from './components/standard-header/standard-header.component';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';
import { AigCityDetailPageComponent } from './components/city-detail-page/city-detail-page.component';
import { AigCityDialogComponent } from './components/city-dialog-page/city-dialog-page.component';
import { AigCpvListPageComponent } from './components/cpv-list-page/cpv-list-page.component';
import { AigCpvDialogComponent } from './components/cpv-dialog-page/cpv-dialog-page.component';
import { AigCpvDetailPageComponent } from './components/cpv-detail-page/cpv-detail-page.component';
import { AigSocialActionListPageComponent } from './components/social-action-list-page/social-action-list-page.component';
import { AigSocialActionDetailPageComponent } from './components/social-action-detail/social-action-detail.component';
import { AigSocialActionDialogComponent } from './components/social-action-dialog/social-action-dialog.component';
import { AigSocialListPageComponent } from './components/social-list-page/social-list-page.component';
import { AigSocialDetailPageComponent } from './components/social-detail-page/social-detail-page.component';
import { AigSocialDialogComponent } from './components/social-dialog/social-dialog.component';
import { AigIppLotCategoryListPageComponent } from './components/ipp-lot-category-list-page/ipp-lot-category-list-page.component';
import { AigIppLotTypeListPageComponent } from './components/ipp-lot-type-list-page/ipp-lot-type-list-page.component';
import { AigIppModalityListPageComponent } from './components/ipp-modality-list-page/ipp-modality-list-page.component';
import { AigIppProcedureListPageComponent } from './components/ipp-procedure-list-page/ipp-procedure-list-page.component';
import { AigIppSectorListPageComponent } from './components/ipp-sector-list-page/ipp-sector-list-page.component';
import { AigIppLotTypeDetailPageComponent } from './components/ipp-lot-type-detail-page/ipp-lot-type-detail-page.component';
import { AigIppLotTypeDialogComponent } from './components/ipp-lot-type-dialog-page/ipp-lot-type-dialog-page.component';
import { AigIppModalityDetailPageComponent } from './components/ipp-modality-detail-page/ipp-modality-detail-page.component';
import { AigIppModalityDialogComponent } from './components/ipp-modality-dialog-page/ipp-modality-dialog-page.component';
import { AigIppProcedureDetailPageComponent } from './components/ipp-procedure-detail-page/ipp-procedure-detail-page.component';
import { AigIppProcedureDialogComponent } from './components/ipp-procedure-dialog-page/ipp-procedure-dialog-page.component';
import { AigIppSectorDetailPageComponent } from './components/ipp-sector-detail-page/ipp-sector-detail-page.component';
import { AigIppSectorDialogComponent } from './components/ipp-sector-dialog-page/ipp-sector-dialog-page.component';
import { AigLotCategoryDetailPageComponent } from './components/ipp-lot-category-detail-page/lot-category-detail-page.component';
import { AigLotCategoryDialogComponent } from './components/ipp-lot-category-dialog-page/lot-category-dialog-page.component';

@NgModule({
    declarations: [
        AigStandardHeaderComponent,

        AigCityListPageComponent,
        AigCityDetailPageComponent,
        AigCityDialogComponent,
        
        AigSocialListPageComponent,
        AigSocialActionListPageComponent,
        AigSocialDetailPageComponent,
        AigSocialDialogComponent,

        AigCpvListPageComponent,
        AigCpvDialogComponent,
        AigCpvDetailPageComponent,

        AigIppModalityListPageComponent,
        AigIppProcedureListPageComponent,
        AigIppSectorListPageComponent,
        
        AigIppLotTypeListPageComponent,
        AigIppLotTypeDetailPageComponent,
        AigIppLotTypeDialogComponent,

        AigIppLotCategoryListPageComponent,
        AigLotCategoryDetailPageComponent,
        AigLotCategoryDialogComponent,

        AigIppModalityDetailPageComponent,
        AigIppModalityDialogComponent,

        AigIppProcedureDetailPageComponent,
        AigIppProcedureDialogComponent,

        AigIppSectorDetailPageComponent,
        AigIppSectorDialogComponent,

        AigSocialActionDetailPageComponent,
        AigSocialActionDialogComponent,
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
    ],
    exports: [],
    providers: [],
    entryComponents: [
        AigSocialDialogComponent,
        AigSocialActionDialogComponent,
        AigCityDialogComponent,
        AigCpvDialogComponent,
        AigIppLotTypeDialogComponent,
        AigIppModalityDialogComponent,
        AigIppProcedureDialogComponent,
        AigIppSectorDialogComponent,
        AigLotCategoryDialogComponent,
    ],
})
export class AigStandardModule {}