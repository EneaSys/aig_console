import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { AgalCommonService } from './services/common.service';
import { AgalPaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
	imports: [ 
		CommonModule,
		
		FormsModule,
        ReactiveFormsModule,
		
        DropdownModule,
	],
	declarations: [
		AgalPaginatorComponent,
	],
	exports: [
		AgalPaginatorComponent,

		TableModule,
	],
	providers: [
		AgalCommonService,
	],
})
export class AgalCoreModule {}