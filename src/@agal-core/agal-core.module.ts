import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
	],
	providers: [
		AgalCommonService,
	],
})
export class AgalCoreModule {}