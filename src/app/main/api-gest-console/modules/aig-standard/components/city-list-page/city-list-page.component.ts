import { Component } from '@angular/core';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
        private eventService: EventService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    citys: CityDTO[];

    async loadComponent() {
        this.citys = await this.cityResourceService.getAllCitiesUsingGET().toPromise();
    }
}
