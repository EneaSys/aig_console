import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { AgalPaginatorComponent } from './components/paginator/paginator.component';
import { AgalCommonService } from './services/common.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

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
		AgalPaginatorComponent,
		TableModule,
	],
	providers: [
		AgalCommonService,
	],
})
export class AgalCoreModule {}