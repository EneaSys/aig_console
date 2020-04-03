import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigSolidarityRequestNewDialogComponent } from '../solidarity-request-new-dialog/solidarity-request-new-dialog.component';
import { ComplexApiControllerService, FoodProductRequestResourceService, FoodProductRequestDTO } from 'aig-solidarety';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './solidarity-request-list-page.component.html',
    styleUrls: ['./solidarity-request-list-page.component.scss']
})
export class AigSolidarityRequestListPageComponent extends GenericComponent {
    constructor(
        private _formBuilder: FormBuilder,
        private foodProductRequestResourceService: FoodProductRequestResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    searchForm: FormGroup;

    displayedColumns = [ "id", "surname", "name", "cf", "type", "status", "buttons" ]

    foodProductRequests: FoodProductRequestDTO[];

    activeFilter = "";

    size = 30;
    page = 0;

    loadComponent() {
        this.searchForm = this._formBuilder.group({
            firstname: [''],
            lastname: [''],
            taxId: [''],
        });

        this.showAll();
    }


    showAll() {
        this.activeFilter = "all";
        this.searchByState(null);
    }
    showInserted() {
        this.activeFilter = "inserted";
        this.searchByState("0");
    }
    showValutation() {
        this.activeFilter = "valutation";
        this.searchByState("1");
    }
    showRejected() {
        this.activeFilter = "rejected";
        this.searchByState("99");
    }
    showAproved() {
        this.activeFilter = "aproved";
        this.searchByState("2");
    }

    async search() {
        this.searchForm;
    }

    async searchByState(state: string) {
        this.foodProductRequests = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,state,null,null,null,this.page,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.size,null,null,null,null).toPromise();
    }

    newSolidarityRequest() {
        this.dialog.open(AigSolidarityRequestNewDialogComponent);
    }
}
