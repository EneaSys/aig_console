import { NgModule } from '@angular/core';
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
import { AigCityTableComponent } from './components/city-table/city-table.component';
import { AigCityNewFormComponent } from './components/city-new-form/city-new-form.component';
import { AigCpvTableComponent } from './components/cpv-table/cpv-table.component';
import { AigCpvNewFormComponent } from './components/cpv-new-form/cpv-new-form.component';


@NgModule({
    declarations: [
        AigCityTableComponent,
        AigCityNewFormComponent,
        AigCpvTableComponent,
        AigCpvNewFormComponent,
    ],
    imports: [ 
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
        AigCityTableComponent,
        AigCityNewFormComponent,
        AigCpvTableComponent,
        AigCpvNewFormComponent,
    ],
    providers: [],
})
export class AigCommonStandardModule {}