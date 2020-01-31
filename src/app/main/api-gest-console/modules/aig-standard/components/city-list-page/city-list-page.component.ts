import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCityNewUpdateDialogComponent } from '../city-dialog-page/city-dialog-page.component';

@Component({
    templateUrl: './city-list-page.component.html',
    styleUrls: ['./city-list-page.component.scss']
})
export class AigCityListPageComponent extends GenericComponent {
    constructor(
        private cityResourceService: CityResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['id', 'code', 'name','wikiCode', 'buttons'];
    citys: CityDTO[];

    async loadComponent() {
        this.citys = await this.cityResourceService.getAllCitiesUsingGET().toPromise();
        console.log(this.citys);
    }

    newCity(){
        this.dialog.open(AigCityNewUpdateDialogComponent);
    }
}
