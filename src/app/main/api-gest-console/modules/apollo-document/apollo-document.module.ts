import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { AigCommonModule } from 'aig-common/common.module';
import { AigOldCommonModule } from 'aig-common/old-common/old-common.module';

import { AigApolloDocumentListTableComponent } from './component/apollo-document-list/apollo-document-list-table.component';
import { AigApolloDocumentHeaderComponent } from './component/apollo-document-header.component';
import { AigApolloDocumentListComponent } from './component/apollo-document-list/apollo-document-list.component';
import { ApolloDocumentTypePipe } from './pipe/ApolloDocumentType.pipe';
import { ApolloDocumentDetailComponent } from './component/apollo-document-detail/apollo-document-detail.component';
import { ApolloDocumentLineListTableComponent } from './component/apollo-document-line-list/apollo-document-line-list.component';



@NgModule({
    declarations: [
        ApolloDocumentTypePipe,

        AigApolloDocumentHeaderComponent,

        AigApolloDocumentListComponent,
        AigApolloDocumentListTableComponent,

        ApolloDocumentDetailComponent,

        ApolloDocumentLineListTableComponent,
    ],
    imports: [
        AigCommonModule,
        // Per i service
        AigOldCommonModule,

        FuseSharedModule,
        FuseSidebarModule,

        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,

    ],
    exports: [

    ],
    providers: [

    ],
})
export class AigApolloDocumentModule {}