import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AigCommonModule } from 'aig-common/common.module';
import { AigCityTableComponent } from './components/city-table/city-table.component';


@NgModule({
    declarations: [
        AigCityTableComponent,
    ],
    imports: [ 
        AigCommonModule,
        CommonModule,

        MatTableModule,
        MatProgressSpinnerModule,

        MatButtonModule,
        MatIconModule,
        
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        
        FlexLayoutModule,
    ],
    exports: [
        AigCityTableComponent,
    ],
    providers: [],
})
export class AigCommonStandardModule {}