import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CityDTO, CityResourceService } from 'aig-standard';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigCityDialogComponent } from '../city-dialog-page/city-dialog-page.component';

@Component({
    templateUrl: './city-detail-page.component.html',
    styleUrls: ['./city-detail-page.component.scss']
})
export class AigCityDetailPageComponent extends GenericComponent {
    constructor(
        private cityResourceService: CityResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    city: CityDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.city = this.route.snapshot.data.city;
        } else {
            this.city = await this.cityResourceService.getCityUsingGET(this.city.id).toPromise();
        }
    }

    editCity(city: CityDTO) {
        this.dialog.open(AigCityDialogComponent, { data: { city: city } });
    }

}
