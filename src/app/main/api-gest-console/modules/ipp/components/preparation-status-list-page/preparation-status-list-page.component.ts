import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import {PartecipationStatusDTO, PartecipationStatusResourceService, PreparationDTO, PreparationResourceService, PreparationStatusDTO, PreparationStatusResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPartecipationStatusNewUpdateDialogComponent } from "../partecipation-status-new-update-dialog/partecipation-status-new-update-dialog.component";
import { AigPreparationNewUpdateDialogComponent } from "../preparation-new-update-dialog/preparation-new-update-dialog.component";
import { AigPreparationStatusNewUpdateDialogComponent } from "../preparation-status-new-update-dialog/preparation-status-new-update-dialog.component";


@Component({
    templateUrl: './preparation-status-list-page.component.html',
    styleUrls: ['./preparation-status-list-page.component.scss']
})
export class AigPreparationStatusListPageComponent extends GenericComponent {
    constructor(
       
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        private preparationStatusResourceService: PreparationStatusResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initPreparationStatusSearch();

		this.showAllPreparationStatus();
	}

	reloadPage() {
		this.showAllPreparationStatus();
	}


//			---- TABLE AND SEARCH SECTION ----

preparationStatusSearchFormGroup: FormGroup;
preparationStatusPaginationSize: number;
preparationStatusFilters: any;

preparationStatusLength: number;
preparationStatusDTOs: PreparationStatusDTO[];
preparationStatusError: any;

preparationStatusDC: string[];

	
private initPreparationStatusSearch() {
	this.preparationStatusDC = ["id","description","buttons"];

	this.preparationStatusPaginationSize = 10;
		

	this.preparationStatusSearchFormGroup = this._formBuilder.group({
			id: [''],
			description: [''],
		});
	}

private clearFiltersPreparationStatus() {
	this.preparationStatusFilters = {
		idEquals: null,
	}
}

private async searchPreparationStatus(page: number) {
	this.preparationStatusDTOs = null;

	this.preparationStatusFilters.page = page;
	this.preparationStatusFilters.size = this.preparationStatusPaginationSize;

	try {
		this.preparationStatusLength = await this.preparationStatusResourceService.countPreparationStatusesUsingGET({}).toPromise();  

		if(this.preparationStatusLength == 0) {
			this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
			this.preparationStatusDTOs = [];
			return;
		}

		this.preparationStatusDTOs =  await this.preparationStatusResourceService.getAllPreparationStatusesUsingGET({}).toPromise();
	} catch (e) {
		console.log(e);
		this.preparationStatusError = e;
	}
}

	

showAllPreparationStatus() {
	this.resetFiltersPreparationStatus();
		
}

resetFiltersPreparationStatus() {
	this.preparationStatusSearchFormGroup.reset();
	this.clearFiltersPreparationStatus();
	this.searchPreparationStatus(0);

}

preparationStatusPaginationEvent(pageEvent: PageEvent) {
	this.preparationStatusPaginationSize = pageEvent.pageSize;
	this.searchPreparationStatus(pageEvent.pageIndex);
}

preparationStatusSearchWithFilter() {
	let searchedId = this.preparationStatusSearchFormGroup.controls.id.value;

	if(searchedId != null) {
		this.clearFiltersPreparationStatus();
		this.preparationStatusSearchFormGroup.reset();
		this.preparationStatusFilters.idEquals = searchedId;
		this.searchPreparationStatus(0);
		return;
	}
	this.preparationStatusFilters.idEquals = null;

		/*this.dossierFilters.nameContains = this.dossierSearchFormGroup.controls.name.value;*/

	this.searchPreparationStatus(0);
}

	//			---- !TABLE AND SEARCH SECTION ----

newPreparationStatus(): void {
    this.dialog.open(AigPreparationStatusNewUpdateDialogComponent, { data: { preparationStatus: {} } });
    }

	
}

