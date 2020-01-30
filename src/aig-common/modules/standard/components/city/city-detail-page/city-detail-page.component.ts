import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityDTO } from 'aig-standard';

@Component({
    templateUrl: './city-detail-page.component.html',
    styleUrls: ['./city-detail-page.component.scss']
})
export class AigCityDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    cityDTO: CityDTO;
    
    loadComponent(): void {
        this.cityDTO = this.route.snapshot.data.city;
    }

}
