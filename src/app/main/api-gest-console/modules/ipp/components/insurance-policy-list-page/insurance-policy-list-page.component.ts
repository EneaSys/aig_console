import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import {InsurancePolicyResourceService, PartecipationStatusDTO, PartecipationStatusResourceService, PreparationDTO, PreparationResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigInsurancePolicyNewUpdateDialogComponent } from "../insurance-policy-new-update-dialog/insurance-policy-new-update-dialog.component";
import { AigPartecipationStatusNewUpdateDialogComponent } from "../partecipation-status-new-update-dialog/partecipation-status-new-update-dialog.component";
import { AigPreparationNewUpdateDialogComponent } from "../preparation-new-update-dialog/preparation-new-update-dialog.component";


@Component({
    templateUrl: './insurance-policy-list-page.component.html',
    styleUrls: ['./insurance-policy-list-page.component.scss']
})
export class AigInsurancePolicyListPageComponent extends GenericComponent {
    constructor(
       
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        private insurancePolicyResourceService: InsurancePolicyResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initInsurancePolicySearch();

		this.showAllInsurancePolicy();
	}

	reloadPage() {
		this.showAllInsurancePolicy();
	}


//			---- TABLE AND SEARCH SECTION ----

insurancePolicySearchFormGroup: FormGroup;
insurancePolicyPaginationSize: number;
insurancePolicyFilters: any;

insurancePolicyLength: number;
insurancePolicyDTOs: PreparationDTO[];
insurancePolicyError: any;

insurancePolicyDC: string[];

	
private initInsurancePolicySearch() {
	this.insurancePolicyDC = ["id","buttons"];

	this.insurancePolicyPaginationSize = 10;
		

	this.insurancePolicySearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

private clearFiltersInsurancePolicy() {
	this.insurancePolicyFilters = {
		idEquals: null,
	}
}

private async searchInsurancePolicy(page: number) {
	this.insurancePolicyDTOs = null;

	this.insurancePolicyFilters.page = page;
	this.insurancePolicyFilters.size = this.insurancePolicyPaginationSize;

	try {
		this.insurancePolicyLength = await this.insurancePolicyResourceService.countInsurancePoliciesUsingGET({}).toPromise();  

		if(this.insurancePolicyLength == 0) {
			this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
			this.insurancePolicyDTOs = [];
			return;
		}

		this.insurancePolicyDTOs =  await this.insurancePolicyResourceService.getAllInsurancePoliciesUsingGET({}).toPromise();
	} catch (e) {
		console.log(e);
		this.insurancePolicyError = e;
	}
}

	

showAllInsurancePolicy() {
	this.resetFiltersInsurancePolicy();
		
}

resetFiltersInsurancePolicy() {
	this.insurancePolicySearchFormGroup.reset();
	this.clearFiltersInsurancePolicy();
	this.searchInsurancePolicy(0);

}

insurancePolicyPaginationEvent(pageEvent: PageEvent) {
	this.insurancePolicyPaginationSize = pageEvent.pageSize;
	this.searchInsurancePolicy(pageEvent.pageIndex);
}

insurancePolicySearchWithFilter() {
	let searchedId = this.insurancePolicySearchFormGroup.controls.id.value;

	if(searchedId != null) {
		this.clearFiltersInsurancePolicy();
		this.insurancePolicySearchFormGroup.reset();
		this.insurancePolicyFilters.idEquals = searchedId;
		this.searchInsurancePolicy(0);
		return;
	}
	this.insurancePolicyFilters.idEquals = null;

		/*this.dossierFilters.nameContains = this.dossierSearchFormGroup.controls.name.value;*/

	this.searchInsurancePolicy(0);
}

	//			---- !TABLE AND SEARCH SECTION ----

newInsurancePolicy(): void {
    this.dialog.open(AigInsurancePolicyNewUpdateDialogComponent, { data: { insurancePolicy: {} } });
    }

	
}

