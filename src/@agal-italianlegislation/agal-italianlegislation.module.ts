import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgalCoreModule } from '@agal-core/agal-core.module';
import { AigItalianLegislationApiModule } from 'aig-italianlegislation';
import { AgalProcurementLotListLoaderComponent } from './components/procurement-lot/procurement-lot-list-loader/procurement-lot-list-loader.component';
import { AgalPartecipationListLoaderComponent } from './components/partecipation/partecipation-list-loader/partecipation-list-loader.component';
import { AigGenericModule } from 'app/main/api-gest-console/modules/aig-generic/aig-generic.module';
import { CommonGenericModule } from 'aig-common/modules/generic/common-generic.module';
import { AigCommonStandardModule } from 'aig-common/modules/standard/common-standard.module';
import { AigStandardModule } from 'app/main/api-gest-console/modules/aig-standard/aig-standard.module';

@NgModule({
	imports: [ 
		CommonModule,

		AgalCoreModule,

		AigItalianLegislationApiModule,

		AigCommonStandardModule,

		AigStandardModule,

		AigGenericModule,

		CommonGenericModule,



	],
	declarations: [
		AgalProcurementLotListLoaderComponent,
		AgalPartecipationListLoaderComponent,

	],
	exports: [
		AgalProcurementLotListLoaderComponent,
		AgalPartecipationListLoaderComponent,
		
	],
	providers: [
		
	],
})
export class AgalItalianLegislationModule {}