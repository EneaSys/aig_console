import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AigStandardClientModule  } from 'aig-standard';
import { aigStandardRoute } from './aig-standard.route';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';

@NgModule({
    declarations: [
        AigCityListPageComponent
    ],
    imports: [
        RouterModule.forChild(aigStandardRoute),

        CommonModule,

        AigStandardClientModule,
    ],
    exports: [],
    providers: [],
})
export class AigStandardModule {}