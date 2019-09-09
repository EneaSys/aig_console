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

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { AigCommonModule } from '../_common/common.module';

import { AigApolloDocumentListTableComponent } from './component/apollo-document-list/apollo-document-list-table.component';
import { AigApolloDocumentHeaderComponent } from './component/apollo-document-header.component';
import { AigApolloDocumentListComponent } from './component/apollo-document-list/apollo-document-list.component';
import { ApolloDocumentTypePipe } from './pipe/ApolloDocumentType.pipe';

@NgModule({
    declarations: [
        AigApolloDocumentHeaderComponent,

        AigApolloDocumentListComponent,
        AigApolloDocumentListTableComponent,

        ApolloDocumentTypePipe,
    ],
    imports: [
        AigCommonModule,

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

    ],
    exports: [

    ],
    providers: [

    ],
})
export class AigApolloDocumentModule {}