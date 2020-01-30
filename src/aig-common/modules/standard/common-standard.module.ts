import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AigCommonModule } from 'aig-common/common.module';
import { AigCityListTableComponent } from './components/city/city-list-table/city-list-table.component';
import { FuseSidebarModule } from '@fuse/components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AigCityDetailPageComponent } from './components/city/city-detail-page/city-detail-page.component';
import { AigSocialListTableComponent } from './components/social/social-list-table/social-list-table.component';
import { AigSocialDetailPageComponent } from './components/social/social-detail-page/social-detail-page.component';
import { AigSocialDialogComponent } from './components/social/social-dialog/social-dialog.component';
import { AigCityDialogComponent } from './components/city/city-dialog-page/city-dialog-page.component';
import { AigSocialFormComponent } from './components/social/social-form/social-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AigCityFormComponent } from "./components/city/city-form/city-form.component";
import { AigSocialActionListTableComponent } from './components/social-action/social-action-list-table/social-action-list-table.component';
import { AigSocialActionDetailPageComponent } from './components/social-action/social-action-detail/social-action-detail.component';
import { AigSocialActionFormComponent } from './components/social-action/social-action-form/social-action-form.component';
import { AigSocialActionDialogComponent } from './components/social-action/social-action-dialog/social-action-dialog.component';
import { AigCpvListTableComponent } from './components/cpv/cpv-list-table/cpv-list-table.component';
import { AigCpvDetailPageComponent } from './components/cpv/cpv-detail-page/cpv-detail-page.component';
import { AigCpvFormComponent } from './components/cpv/cpv-form/cpv-form.component';
import { AigCpvDialogComponent } from './components/cpv/cpv-dialog-page/cpv-dialog-page.component';
import { AigIppModalityDetailPageComponent } from './components/ipp-modality/ipp-modality-detail-page/ipp-modality-detail-page.component';
import { AigIppModalityFormComponent } from './components/ipp-modality/ipp-modality-form/ipp-modality-form.component';
import { AigIppModalityListTableComponent } from './components/ipp-modality/ipp-modality-list-table/ipp-modality-list-table.component';
import { AigIppModalityDialogComponent } from "./components/ipp-modality/ipp-modality-dialog-page/ipp-modality-dialog-page.component";
import { AigIppProcedureDetailPageComponent } from './components/ipp-procedure/ipp-procedure-detail-page/ipp-procedure-detail-page.component';
import { AigIppProcedureDialogComponent } from './components/ipp-procedure/ipp-procedure-dialog-page/ipp-procedure-dialog-page.component';
import { AigIppProcedureListTableComponent } from './components/ipp-procedure/ipp-procedure-list-table/ipp-procedure-list-table.component';
import { AigIppProcedureFormComponent } from "./components/ipp-procedure/ipp-procedure-form/ipp-procedure-form.component";
import { AigIppSectorDialogComponent } from './components/ipp-sector/ipp-sector-dialog-page/ipp-sector-dialog-page.component';
import { AigIppSectorDetailPageComponent } from './components/ipp-sector/ipp-sector-detail-page/ipp-sector-detail-page.component';
import { AigIppSectorFormComponent } from './components/ipp-sector/ipp-sector-form/ipp-sector-form.component';
import { AigIppSectorListTableComponent } from './components/ipp-sector/ipp-sector-list-table/ipp-sector-list-table.component';
import { AigIppLotTypeDetailPageComponent } from './components/ipp-lot-type/ipp-lot-type-detail-page/ipp-lot-type-detail-page.component';
import { AigIppLotTypeDialogComponent } from './components/ipp-lot-type/ipp-lot-type-dialog-page/ipp-lot-type-dialog-page.component';
import { AigIppLotTypeFormComponent } from './components/ipp-lot-type/ipp-lot-type-form/ipp-lot-type-form.component';
import { AigIppLotTypeListTableComponent } from './components/ipp-lot-type/ipp-lot-type-list-table/ipp-lot-type-list-table.component';
import { AigLotCategoryDetailPageComponent } from './components/ipp-lot-category/lot-category-detail-page/lot-category-detail-page.component';
import { AigLotCategoryDialogComponent } from './components/ipp-lot-category/lot-category-dialog-page/lot-category-dialog-page.component';
import { AigLotCategoryFormComponent } from './components/ipp-lot-category/lot-category-form/lot-category-form.component';
import { AigLotCategoryListTableComponent } from './components/ipp-lot-category/lot-category-list-table/lot-category-list-table.component';

@NgModule({
    declarations: [

        AigCityListTableComponent,
        AigCityDetailPageComponent,
        AigCityDialogComponent,
        AigCityFormComponent,

        AigSocialListTableComponent,
        AigSocialDetailPageComponent,
        AigSocialDialogComponent,
        AigSocialFormComponent,

        AigSocialActionListTableComponent,
        AigSocialActionDetailPageComponent,
        AigSocialActionFormComponent,
        AigSocialActionDialogComponent,
        
        AigCpvListTableComponent,
        AigCpvDetailPageComponent,
        AigCpvFormComponent,
        AigCpvDialogComponent,

        AigIppModalityDetailPageComponent,
        AigIppModalityFormComponent,
        AigIppModalityListTableComponent,
        AigIppModalityDialogComponent,

        AigIppProcedureDetailPageComponent,
        AigIppProcedureDialogComponent,
        AigIppProcedureListTableComponent,
        AigIppProcedureFormComponent,

        AigIppSectorDetailPageComponent,
        AigIppSectorDialogComponent,
        AigIppSectorFormComponent,
        AigIppSectorListTableComponent,

        AigIppLotTypeDetailPageComponent,
        AigIppLotTypeDialogComponent,
        AigIppLotTypeFormComponent,
        AigIppLotTypeListTableComponent,

        AigLotCategoryDetailPageComponent,
        AigLotCategoryDialogComponent,
        AigLotCategoryFormComponent,
        AigLotCategoryListTableComponent
        
    ],
    imports: [ 
        AigCommonModule,
        CommonModule,

        MatTableModule,
        MatProgressSpinnerModule,
        RouterModule,

        MatTableModule,
        MatProgressSpinnerModule,

        FuseSidebarModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        FlexLayoutModule,
        FormsModule,ReactiveFormsModule,
        MatTableModule,
        MatProgressSpinnerModule,

        MatButtonModule,
        MatIconModule,
        
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,

    ],
    exports: [

        AigCityListTableComponent,
        AigCityDetailPageComponent,

        AigSocialListTableComponent,

        AigSocialActionListTableComponent,
        
        AigCpvListTableComponent,
       
        AigIppModalityListTableComponent,

        AigIppSectorListTableComponent,

        AigIppLotTypeListTableComponent,

        AigIppProcedureListTableComponent,

        AigLotCategoryListTableComponent
        
    ],
    entryComponents: [
        AigCityDialogComponent,
        AigSocialDialogComponent,
        AigSocialActionDialogComponent,
        AigCpvDialogComponent,
        AigIppModalityDialogComponent,
        AigIppProcedureDialogComponent,
        AigIppSectorDialogComponent,
        AigIppLotTypeDialogComponent,
        AigLotCategoryDialogComponent
    ],
    providers: [],
})
export class AigCommonStandardModule {}