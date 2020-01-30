import { Component, OnInit } from '@angular/core';
import { CityDTO } from 'api-gest';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './city-detail-page.component.html',
    styleUrls: ['./city-detail-page.component.scss']
})
export class AigCityDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    city: CityDTO;

    loadComponent(): void {
        this.city = this.route.snapshot.data.city;
    }

    addPermissionToCity(): void {
        // this.dialog.open(AigAssociateCityToPermissionDialogComponent, { data: { city: this.city } });
    }
}
