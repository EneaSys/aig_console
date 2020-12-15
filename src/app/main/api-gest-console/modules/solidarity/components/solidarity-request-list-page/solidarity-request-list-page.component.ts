import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigSolidarityRequestNewDialogComponent } from '../solidarity-request-new-dialog/solidarity-request-new-dialog.component';
import { FoodProductRequestResourceService, FoodProductRequestDTO, FamilyUnitResourceService, FamilyUnitDTO } from 'aig-solidarety';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

@Component({
    templateUrl: './solidarity-request-list-page.component.html',
    styleUrls: ['./solidarity-request-list-page.component.scss']
})
export class AigSolidarityRequestListPageComponent extends GenericComponent {
    constructor(
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private familyUnitResourceService: FamilyUnitResourceService,
        private foodProductRequestResourceService: FoodProductRequestResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    searchForm: FormGroup;

    displayedColumns = [ "id", "surname", "name", "cf", "familyTotal", "type", "status", "instructor", "buttons" ]

    foodProductRequestDTOs: FoodProductRequestDTO[] = [];

    length: number;
    index: number;

    filters = {
        id: null,
        state: null,
        category: null,
        familyUnitIds: [],
        page: 0,
        size: 30,
    }

    loadComponent() {
        this.searchForm = this._formBuilder.group({
            id: [''],
            firstname: [''],
            lastname: [''],
            taxId: [''],
        });

        this.showAll();
    }

    cleanFilters() {
        this.filters.id = null;
        this.filters.state = null;
        this.filters.category = null;
        this.filters.familyUnitIds = [];
    }

    showAll() {
        this.cleanFilters();
        this.search(0);
    }
    searchByState(state: string) {
        this.filters.state = state;
        this.search(0);
    }
    searchByCategory(category: string) {
        this.filters.category = category;
        this.customSearch();
    }

    pageEvent(event: PageEvent) {
        this.filters.size = event.pageSize;
        
        this.search(event.pageIndex);
    }

    async search(page) {
        this.index = page
        this.filters.page = page;

        //e.familyUnit.postalCode

        let categoryFilter = {
            A:null,
            B:null,
            C:null
        }
/*
        if(this.filters.category == "A") {
            null = true;
        }
        if(this.filters.category == "B") {
            null = true;
        }
        if(this.filters.category == "C") {
            null = true;
        }
*/
        this.length = await this.foodProductRequestResourceService.countFoodProductRequestsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,this.filters.familyUnitIds,null,null,null,null,this.filters.id,null,null,null,null,null,null,null,null,null,this.filters.state,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null).toPromise();
        this.foodProductRequestDTOs = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,this.filters.familyUnitIds,null,null,null,null,this.filters.id,null,null,null,null,null,null,null,null,null,this.filters.state,null,null,null,this.filters.page,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.filters.size,null,null,null,null).toPromise();
        
        if(this.foodProductRequestDTOs.length == 0) {
            this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
        }
    }

    async customSearch() {
        if(this.searchForm.value.id) {
            this.cleanFilters();
            this.filters.id = this.searchForm.value.id;
            this.search(0);
        } else if(this.searchForm.value.firstname || this.searchForm.value.lastname || this.searchForm.value.taxId || this.filters.category) {
            this.filters.familyUnitIds = [];
            {
                let firstname;
                let lastname;
                let taxId;
                if(this.searchForm.value.firstname != "") firstname = this.searchForm.value.firstname;
                if(this.searchForm.value.lastname != "") lastname = this.searchForm.value.lastname;
                if(this.searchForm.value.taxId != "") taxId = this.searchForm.value.taxId;

                let familyUnitDTOs: FamilyUnitDTO[] = await this.familyUnitResourceService.getAllFamilyUnitsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,firstname,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.filters.category,null,null,null,null,null,null,null,null,null,null,null,30,null,lastname,null,null,null,null,null,null,null,taxId,null,null,null,null,null,null,null,null,null).toPromise();
   
                familyUnitDTOs.forEach(familyUnitDTO => {
                    this.filters.familyUnitIds.push(familyUnitDTO.id);
                })
            }
            this.search(0);
        } else {
            this.filters.id = null;
            this.filters.familyUnitIds = [];

            this.search(0);
        }
    }

    newSolidarityRequest() {
        this.dialog.open(AigSolidarityRequestNewDialogComponent);
    }
}
