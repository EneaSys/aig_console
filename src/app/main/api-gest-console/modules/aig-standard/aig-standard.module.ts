import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AigStandardClientModule  } from 'aig-standard';
import { aigStandardRoute } from './aig-standard.route';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';
import { AigCpvListPageComponent } from './components/cpv-list-page/cpv-list-page.component';
import { AigIppLotCategoryListPageComponent } from './components/ipp-lot-category-list-page/ipp-lot-category-list-page.component';
import { AigIppLotTypeListPageComponent } from './components/ipp-lot-type-list-page/ipp-lot-type-list-page.component';
import { AigIppModalityListPageComponent } from './components/ipp-modality-list-page/ipp-modality-list-page.component';
import { AigIppProcedureListPageComponent } from './components/ipp-procedure-list-page/ipp-procedure-list-page.component';
import { AigIppSectorListPageComponent } from './components/ipp-sector-list-page/ipp-sector-list-page.component';
import { AigSocialActionListPageComponent } from './components/social-action-list-page/social-action-list-page.component';
import { AigSocialListPageComponent } from './components/social-list-page/social-list-page.component';
import { AigCityListTableComponent } from './components/city-list-table/city-list-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FuseSidebarModule } from '@fuse/components';
import { MatButtonModule } from '@angular/material/button';
import { AigSocialListTableComponent } from './components/social-list-table/social-list-table.component';
import { AigCityDetailPageComponent } from './components/city-detail-page/city-detail-page.component';
import { AigSocialActionListTableComponent } from './components/social-action-list-table/social-action-list-table.component';
import { AigSocialDetailPageComponent } from "./components/social-detail-page/social-detail-page.component";
import { AigSocialDialogComponent } from './components/social-dialog/social-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
  
@NgModule({
    declarations: [

        AigCityListPageComponent,
        AigCityDetailPageComponent, 
        
        AigSocialListPageComponent,
        AigSocialActionListPageComponent,
        AigSocialDetailPageComponent,
        AigSocialDialogComponent,

        AigCpvListPageComponent,

        AigIppModalityListPageComponent,
        AigIppProcedureListPageComponent,
        AigIppSectorListPageComponent,
        
        AigIppLotTypeListPageComponent,
        AigIppLotCategoryListPageComponent,
        
        
        AigCityListTableComponent,
        AigSocialListTableComponent,
        AigSocialActionListTableComponent,

        

    ],
    imports: [
        RouterModule.forChild(aigStandardRoute),



        MatTableModule,
        MatProgressSpinnerModule,

        FuseSidebarModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,

        
        CommonModule,

        AigStandardClientModule,
    ],
    exports: [],
    providers: [],
})
export class AigStandardModule {}