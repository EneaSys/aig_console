import { Component, OnInit, Input } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO } from 'aig-standard';

import { PermissionDTO } from 'api-gest';

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
    displayedColumns = ['id', 'name', 'code', 'wikicode'];
    
    @Input() error: any;

    async loadComponent() {
        this.citys = await this.cityResourceService.getAllCitiesUsingGET().toPromise();
    }
}
