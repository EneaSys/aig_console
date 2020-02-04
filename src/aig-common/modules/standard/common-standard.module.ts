import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AigCommonModule } from 'aig-common/common.module';
import { AigCpvListTableComponent } from './components/cpv-list-table/cpv-list-table.component';
import { AigCpvNewUpdateFormComponent } from './components/cpv-new-update-form/cpv-new-update-form.component';
import { CpvResolver } from './resolver/cpv.resolver';
import { AigStandardAutocompleteFilterService } from './services/autocomplete-filter.service';
import { AigStandardAutocompleteFunctionService } from './services/autocomplete-function.service';

@NgModule({
    declarations: [
        AigCpvListTableComponent,
        AigCpvNewUpdateFormComponent,
    ],
    imports: [ 
        RouterModule,

        AigCommonModule,
        CommonModule,

        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        MatTableModule,
        MatProgressSpinnerModule,

        MatButtonModule,
        MatIconModule,
        
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatSelectModule,
        
        FlexLayoutModule,
    ],
    exports: [
        AigCpvListTableComponent,
        AigCpvNewUpdateFormComponent,
    ],
    providers: [
        CpvResolver,

        
        AigStandardAutocompleteFilterService,
        AigStandardAutocompleteFunctionService,
    ],
})
export class AigCommonStandardModule {}