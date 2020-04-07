import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigCommonSolidarityModule } from 'aig-common/modules/solidarity/common-solidarity.module';
import { AigSolidarityRequestListPageComponent } from './components/solidarity-request-list-page/solidarity-request-list-page.component';
import { RouterModule } from '@angular/router';
import { solidarityRoute } from './solidarity.route';
import { FuseSidebarModule } from '@fuse/components';
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
import { AigSolidarityRequestNewDialogComponent } from './components/solidarity-request-new-dialog/solidarity-request-new-dialog.component';
import { AigSolidaretyApiModule } from 'aig-solidarety'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AigSolidarityRequestDetailPageComponent } from './components/solidarity-request-detail-page/solidarity-request-detail-page.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [ 
        RouterModule.forChild(solidarityRoute),
        
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        
        AigCommonSolidarityModule,
        AigSolidaretyApiModule,
        
        FuseSharedModule,
        FuseSidebarModule,
        
        MatIconModule,
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
        MatSelectModule,
        
    ],
    declarations: [
        AigSolidarityRequestListPageComponent,
        AigSolidarityRequestNewDialogComponent,
        AigSolidarityRequestDetailPageComponent,
    ],
    providers: [],
    exports: [],
    entryComponents: [
        AigSolidarityRequestNewDialogComponent,
    ]
})
export class AigSolidarityModule {}