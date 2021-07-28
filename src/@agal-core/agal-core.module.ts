import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

import { AgalCommonService } from './services/common.service';
import { AgalPaginatorComponent } from './components/paginator/paginator.component';
import { TableModule } from 'primeng/table';

@NgModule({
	imports: [ 
		CommonModule,
		
		TableModule,

		FormsModule,
        ReactiveFormsModule,

        DropdownModule,
	],
	declarations: [
		AgalPaginatorComponent,
	],
	exports: [
		TableModule,

		AgalPaginatorComponent,
	],
	providers: [
		AgalCommonService,
	],
})
export class AgalCoreModule {}