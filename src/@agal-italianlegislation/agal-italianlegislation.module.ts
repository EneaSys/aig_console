import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgalCoreModule } from '@agal-core/agal-core.module';
import { AigItalianLegislationApiModule } from 'aig-italianlegislation';
import { AgalProcurementLotListLoaderComponent } from './components/procurement-lot/procurement-lot-list-loader/procurement-lot-list-loader.component';

@NgModule({
	imports: [ 
		CommonModule,

		AgalCoreModule,

		AigItalianLegislationApiModule,

	],
	declarations: [
		AgalProcurementLotListLoaderComponent,

	],
	exports: [
		AgalProcurementLotListLoaderComponent,
		
	],
	providers: [
		
	],
})
export class AgalItalianLegislationModule {}