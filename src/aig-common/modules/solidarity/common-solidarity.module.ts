import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigCommonModule } from 'aig-common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AigSolidarityRequestListTableComponent } from './components/solidarity-request-list-table/solidarity-request-list-table.component';
import { AigSolidarityRequestNewUpdateFormComponent } from './components/solidarity-request-new-update-form/solidarity-request-new-update-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AigCommonStandardModule } from '../standard/common-standard.module';
import { RouterModule } from '@angular/router';
import { HelpRequestResolver } from './resolver/help-request.resolver';
import { AigSolidarityRequestCalculatorService } from './services/solidarityRequestCalulator.service';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    imports: [
        AigCommonModule,
        AigCommonStandardModule,
        
        CommonModule,

        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatDatepickerModule,
        MatSortModule,
        
        FlexLayoutModule,

    ],
    providers: [
        HelpRequestResolver,
        AigSolidarityRequestCalculatorService,
    ],
    declarations: [
        AigSolidarityRequestListTableComponent,
        AigSolidarityRequestNewUpdateFormComponent,
    ],
    exports: [
        AigSolidarityRequestListTableComponent,
        AigSolidarityRequestNewUpdateFormComponent,
    ],
})
export class AigCommonSolidarityModule {}