import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CityDTO, CityResourceService } from 'aig-standard';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';

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
        this.dialog.open(AigCityNewUpdateModalComponent, { data: { city: city } });
    }

}
