import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


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
		ButtonModule,
	],
	providers: [
		AgalCommonService,
	],
})
export class AgalCoreModule {}