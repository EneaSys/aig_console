import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AigCommonModule } from 'aig-common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { AigBuyListTableComponent } from './components/buy-list-table/buy-list-table.component';

@NgModule({
    imports: [

        AigCommonModule,
        CommonModule,
        
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        
        FlexLayoutModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,

    ],
    declarations: [
        AigBuyListTableComponent,
    ],
    providers: [

    ],
    exports: [
        AigBuyListTableComponent,
    ],
})
export class AigCommonCommerceModule {}