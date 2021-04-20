import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import {PartecipationStatusDTO, PartecipationStatusResourceService, PreparationDTO, PreparationResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPartecipationStatusNewUpdateDialogComponent } from "../partecipation-status-new-update-dialog/partecipation-status-new-update-dialog.component";
import { AigPreparationNewUpdateDialogComponent } from "../preparation-new-update-dialog/preparation-new-update-dialog.component";


@Component({
    templateUrl: './preparation-list-page.component.html',
    styleUrls: ['./preparation-list-page.component.scss']
})
export class AigPreparationListPageComponent extends GenericComponent {
    constructor(
       
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        private preparationResourceService: PreparationResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initPreparationSearch();

		this.showAllPreparation();
	}

	reloadPage() {
		this.showAllPreparation();
	}


//			---- TABLE AND SEARCH SECTION ----

preparationSearchFormGroup: FormGroup;
preparationPaginationSize: number;
preparationFilters: any;

preparationLength: number;
preparationDTOs: PreparationDTO[];
preparationError: any;

preparationDC: string[];

	
private initPreparationSearch() {
	this.preparationDC = ["id","companyPreparatorEopooCode","note","partecipationId","partecipationProposerEopooCode","statusDescription","statusId","buttons"];

	this.preparationPaginationSize = 10;
		

	this.preparationSearchFormGroup = this._formBuilder.group({
			id: [''],
			companyPreparatorEopooCode: [''],
			note: [''],
			partecipationId: [''],
			partecipationProposerEopooCode: [''],
			statusDescription: [''],
			statusId: [''],
		});
	}

private clearFiltersPreparation() {
	this.preparationFilters = {
		idEquals: null,
	}
}

private async searchPreparation(page: number) {
	this.preparationDTOs = null;

	this.preparationFilters.page = page;
	this.preparationFilters.size = this.preparationPaginationSize;

	try {
		this.preparationLength = await this.preparationResourceService.countPreparationsUsingGET({}).toPromise();  

		if(this.preparationLength == 0) {
			this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
			this.preparationDTOs = [];
			return;
		}

		this.preparationDTOs =  await this.preparationResourceService.getAllPreparationsUsingGET({}).toPromise();
	} catch (e) {
		console.log(e);
		this.preparationError = e;
	}
}

	

showAllPreparation() {
	this.resetFiltersPreparation();
		
}

resetFiltersPreparation() {
	this.preparationSearchFormGroup.reset();
	this.clearFiltersPreparation();
	this.searchPreparation(0);

}

preparationPaginationEvent(pageEvent: PageEvent) {
	this.preparationPaginationSize = pageEvent.pageSize;
	this.searchPreparation(pageEvent.pageIndex);
}

preparationSearchWithFilter() {
	let searchedId = this.preparationSearchFormGroup.controls.id.value;

	if(searchedId != null) {
		this.clearFiltersPreparation();
		this.preparationSearchFormGroup.reset();
		this.preparationFilters.idEquals = searchedId;
		this.searchPreparation(0);
		return;
	}
	this.preparationFilters.idEquals = null;

		/*this.dossierFilters.nameContains = this.dossierSearchFormGroup.controls.name.value;*/

	this.searchPreparation(0);
}

	//			---- !TABLE AND SEARCH SECTION ----

newPreparation(): void {
    this.dialog.open(AigPreparationNewUpdateDialogComponent, { data: { preparation: {} } });
    }

	
}

