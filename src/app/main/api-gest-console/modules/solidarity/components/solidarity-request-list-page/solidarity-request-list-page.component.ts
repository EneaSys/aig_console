import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigSolidarityRequestNewDialogComponent } from '../solidarity-request-new-dialog/solidarity-request-new-dialog.component';
import { ComplexApiControllerService, FoodProductRequestResourceService, FoodProductRequestDTO } from 'aig-solidarety';

@Component({
    templateUrl: './solidarity-request-list-page.component.html',
    styleUrls: ['./solidarity-request-list-page.component.scss']
})
export class AigSolidarityRequestListPageComponent extends GenericComponent {
    constructor(
        private foodProductRequestResourceService: FoodProductRequestResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    foodProductRequest: FoodProductRequestDTO[];

    async loadComponent() {
        this.foodProductRequest = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET().toPromise();
    }

    newSolidarityRequest() {
        this.dialog.open(AigSolidarityRequestNewDialogComponent);
    }
}
