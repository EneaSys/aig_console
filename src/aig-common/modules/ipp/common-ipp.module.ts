import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigCommonModule } from 'aig-common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AigIppClientModule } from 'aig-italian-public-procurement';
import { AigProcurementListTableComponent } from './components/procurement-list-table/procurement-list-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AigProcurementLotListTableComponent } from './components/procurement-lot-list-table/procurement-lot-list-table.component';

@NgModule({
    imports: [
        AigCommonModule,
        CommonModule,

        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        AigIppClientModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
    ],
    providers: [

    ],
    declarations: [
        AigProcurementListTableComponent,
        AigProcurementLotListTableComponent,
    ],
    exports: [
        AigProcurementListTableComponent,
        AigProcurementLotListTableComponent,
    ],
})
export class AigCommonIppModule {}