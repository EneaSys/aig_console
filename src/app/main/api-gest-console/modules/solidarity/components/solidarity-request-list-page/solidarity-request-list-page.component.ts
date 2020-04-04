import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigSolidarityRequestNewDialogComponent } from '../solidarity-request-new-dialog/solidarity-request-new-dialog.component';
import { ComplexApiControllerService, FoodProductRequestResourceService, FoodProductRequestDTO, FamilyUnitResourceService, FamilyUnitDTO } from 'aig-solidarety';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: './solidarity-request-list-page.component.html',
    styleUrls: ['./solidarity-request-list-page.component.scss']
})
export class AigSolidarityRequestListPageComponent extends GenericComponent {
    constructor(
        private _formBuilder: FormBuilder,
        private familyUnitResourceService: FamilyUnitResourceService,
        private foodProductRequestResourceService: FoodProductRequestResourceService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    searchForm: FormGroup;

    displayedColumns = [ "id", "surname", "name", "cf", "type", "status", "instructor", "buttons" ]

    foodProductRequests: FoodProductRequestDTO[];

    activeFilter = "";

    size = 30;
    page = 0;

    loadComponent() {
        this.searchForm = this._formBuilder.group({
            id: [''],
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
    showToReview() {
        this.activeFilter = "toReview";
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
        if(this.searchForm.value.id) {
            this.foodProductRequests = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.searchForm.value.id,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.size,null,null,null,null).toPromise();
        } else {
            let familyUnitIds: number[] = [];
            {
                let familyUnitDTOs: FamilyUnitDTO[] = await this.familyUnitResourceService.getAllFamilyUnitsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.searchForm.value.firstname,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.searchForm.value.lastname,null,null,null,null,null,this.searchForm.value.taxid,null,null,null,null,null,null,null,null,null,null,null).toPromise();
   
                familyUnitDTOs.forEach(familyUnitDTO => {
                    familyUnitIds.push(familyUnitDTO.id);
                    console.log(familyUnitDTO);
                })
            }
            if(familyUnitIds.length > 0) {
                this.foodProductRequests = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,familyUnitIds,null,null,null,null,this.searchForm.value.id,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.size,null,null,null,null).toPromise();
            } else {
                this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
            }
        }
    }

    async searchByState(state: string) {
        this.foodProductRequests = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,state,null,null,null,this.page,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.size,null,null,null,null).toPromise();
    }

    newSolidarityRequest() {
        this.dialog.open(AigSolidarityRequestNewDialogComponent);
    }
}
