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
import { AigSocialListTableComponent } from './components/social/social-list-table/social-list-table.component';
import { AigSocialFormComponent } from './components/social/social-form/social-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AigCityFormComponent } from "./components/city/city-form/city-form.component";
import { AigSocialActionListTableComponent } from './components/social-action/social-action-list-table/social-action-list-table.component';
import { AigSocialActionFormComponent } from './components/social-action/social-action-form/social-action-form.component';
import { AigCpvListTableComponent } from './components/cpv/cpv-list-table/cpv-list-table.component';
import { AigCpvFormComponent } from './components/cpv/cpv-form/cpv-form.component';
import { AigIppModalityFormComponent } from './components/ipp-modality/ipp-modality-form/ipp-modality-form.component';
import { AigIppModalityListTableComponent } from './components/ipp-modality/ipp-modality-list-table/ipp-modality-list-table.component';
import { AigIppProcedureListTableComponent } from './components/ipp-procedure/ipp-procedure-list-table/ipp-procedure-list-table.component';
import { AigIppProcedureFormComponent } from "./components/ipp-procedure/ipp-procedure-form/ipp-procedure-form.component";
import { AigIppSectorFormComponent } from './components/ipp-sector/ipp-sector-form/ipp-sector-form.component';
import { AigIppSectorListTableComponent } from './components/ipp-sector/ipp-sector-list-table/ipp-sector-list-table.component';
import { AigIppLotTypeFormComponent } from './components/ipp-lot-type/ipp-lot-type-form/ipp-lot-type-form.component';
import { AigIppLotTypeListTableComponent } from './components/ipp-lot-type/ipp-lot-type-list-table/ipp-lot-type-list-table.component';
import { AigLotCategoryFormComponent } from './components/ipp-lot-category/lot-category-form/lot-category-form.component';
import { AigLotCategoryListTableComponent } from './components/ipp-lot-category/lot-category-list-table/lot-category-list-table.component';

@NgModule({
    declarations: [

        AigCityListTableComponent,
        AigCityFormComponent,

        AigSocialListTableComponent,
        AigSocialFormComponent,

        AigSocialActionListTableComponent,
        AigSocialActionFormComponent,
        
        AigCpvListTableComponent,
        AigCpvFormComponent,

        AigIppModalityFormComponent,
        AigIppModalityListTableComponent,

        AigIppProcedureListTableComponent,
        AigIppProcedureFormComponent,

        AigIppSectorFormComponent,
        AigIppSectorListTableComponent,

        AigIppLotTypeFormComponent,
        AigIppLotTypeListTableComponent,
        

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
        AigCityFormComponent,

        AigSocialListTableComponent,
        AigSocialFormComponent,

        AigSocialActionListTableComponent,
        AigSocialActionFormComponent,
        
        AigCpvListTableComponent,
        AigCpvFormComponent,
       
        AigIppModalityListTableComponent,
        AigIppModalityFormComponent,

        AigIppSectorListTableComponent,
        AigIppSectorFormComponent,

        AigIppLotTypeListTableComponent,
        AigIppLotTypeFormComponent,

        AigIppProcedureListTableComponent,
        AigIppProcedureFormComponent,

        AigLotCategoryListTableComponent,
        AigLotCategoryFormComponent

    ],
    entryComponents: [

    ],
    providers: [],
})
export class AigCommonStandardModule {}