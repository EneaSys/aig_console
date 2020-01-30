import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AigStandardClientModule  } from 'aig-standard';
import { aigStandardRoute } from './aig-standard.route';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AigStandardHeaderComponent } from './components/standard-header/standard-header.component';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';
import { AigCityNewDialogComponent } from './components/city-new-dialog/city-new-dialog.component';
import { AigCpvListPageComponent } from './components/cpv-list-page/cpv-list-page.component';
import { AigIppLotCategoryListPageComponent } from './components/ipp-lot-category-list-page/ipp-lot-category-list-page.component';
import { AigIppLotTypeListPageComponent } from './components/ipp-lot-type-list-page/ipp-lot-type-list-page.component';
import { AigIppModalityListPageComponent } from './components/ipp-modality-list-page/ipp-modality-list-page.component';
import { AigIppProcedureListPageComponent } from './components/ipp-procedure-list-page/ipp-procedure-list-page.component';
import { AigIppSectorListPageComponent } from './components/ipp-sector-list-page/ipp-sector-list-page.component';
import { AigSocialActionListPageComponent } from './components/social-action-list-page/social-action-list-page.component';
import { AigSocialListPageComponent } from './components/social-list-page/social-list-page.component';
import { AigCommonStandardModule } from 'aig-common/modules/standard/common-standard.module';

@NgModule({
    declarations: [
        AigStandardHeaderComponent,

        AigCityListPageComponent,
        AigCityNewDialogComponent,
        
        AigSocialListPageComponent,
        AigSocialActionListPageComponent,

        AigCpvListPageComponent,

        AigIppModalityListPageComponent,
        AigIppProcedureListPageComponent,
        AigIppSectorListPageComponent,
        
        AigIppLotTypeListPageComponent,
        AigIppLotCategoryListPageComponent,
        
    ],
    imports: [
        RouterModule.forChild(aigStandardRoute),

        CommonModule,
        AigCommonStandardModule,

        AigStandardClientModule,

        FuseSharedModule,
        FuseSidebarModule,

        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
    ],
    exports: [],
    providers: [],
    entryComponents: [
        AigCityNewDialogComponent,
    ]
})
export class AigStandardModule {}