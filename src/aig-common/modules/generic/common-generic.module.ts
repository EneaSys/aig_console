import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigEopooListTableComponent } from './components/eopoo-list-table/eopoo-list-table.component';
import { AigCommonModule } from 'aig-common/common.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EopooNamePipe } from './pipe/eopoo-name.pipe';
import { AigEopooNewFormComponent } from './components/eopoo-new-form/eopoo-new-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    declarations: [
        EopooNamePipe,
        
        AigEopooListTableComponent,
        AigEopooNewFormComponent,
    ],
    exports: [
        AigEopooListTableComponent,
        AigEopooNewFormComponent,
    ],
    imports: [
        AigCommonModule,
        CommonModule,

        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        // inserire dipendenza da modulo delle api

        MatTableModule,
        MatProgressSpinnerModule,
        
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatAutocompleteModule,
    ],
    providers: [],
})
export class CommonGenericModule {}