import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO } from 'aig-standard';

@Component({
    templateUrl: './city-list-page.component.html',
    styleUrls: ['./city-list-page.component.scss']
})
export class AigCityListPageComponent extends GenericComponent {
    constructor(
        private cityResourceService: CityResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    citys: CityDTO[];

    async loadComponent() {
        this.citys = await this.cityResourceService.getAllCitiesUsingGET().toPromise();
    }
}
