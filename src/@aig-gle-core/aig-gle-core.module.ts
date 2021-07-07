import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { AigGlePaginatorComponent } from './components/paginator/paginator.component';
import { AigGleCommonService } from './services/common.service';
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
		AigGlePaginatorComponent,
	],
	exports: [
		AigGlePaginatorComponent,
		TableModule,
	],
	providers: [
		AigGleCommonService,
	],
})
export class AigGleCoreModule {}