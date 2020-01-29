import { Component } from '@angular/core';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO } from 'aig-standard';
// import { AigRoleNewDialogComponent } from '../role-new-dialog/role-new-dialog.component';

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

    cityDisplayedColumns: string[] = ['id', 'name', 'cityCode', 'wikiCode', 'buttons'];
    cityDataSource: Observable<CityDTO[]>;

    loadComponent(): void {
        this.cityDataSource = this.cityResourceService.getAllCitiesUsingGET();
    }

    newCity(): void {
        // this.dialog.open(AigCityNewDialogComponent);
    }
}
