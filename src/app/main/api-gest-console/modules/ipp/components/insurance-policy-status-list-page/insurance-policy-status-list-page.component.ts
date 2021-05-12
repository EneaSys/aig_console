import { Component, Input } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ProcurementResourceService, ProcurementDTO, InsurancePolicyStatusDTO, InsurancePolicyStatusResourceService } from 'aig-italianlegislation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { AigProcurementNewUpdateDialogComponent } from '../procurement-new-update-dialog/procurement-new-update-dialog.component';
import { Observable } from 'rxjs';
import { AigInsurancePolicyStatusNewUpdateDialogComponent } from '../insurance-policy-status-new-update-dialog/insurance-policy-status-new-update-dialog.component';
@Component({
    templateUrl: './insurance-policy-status-list-page.component.html',
    styleUrls: ['./insurance-policy-status-list-page.component.scss']
})
export class AigInsurancePolicyStatusListPageComponent extends GenericComponent {
    constructor(
       
		private _formBuilder: FormBuilder,
        private insurancePolicyStatusResourceService: InsurancePolicyStatusResourceService,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    
    loadPage() {
		this.initInsurancePolicyStatusSearch();

		this.showAllInsurancePolicyStatus();
	}

	reloadPage() {
		this.showAllInsurancePolicyStatus();
	}


//			---- TABLE AND SEARCH SECTION ----

    insurancePolicyStatusSearchFormGroup: FormGroup;
	insurancePolicyStatusPaginationSize: number;
	insurancePolicyStatusFilters: any;

	insurancePolicyStatusLength: number;
	insurancePolicyStatusDTOs: InsurancePolicyStatusDTO[];
	insurancePolicyStatusError: any;

	insurancePolicyStatusDC: string[];

	
	private initInsurancePolicyStatusSearch() {
		this.insurancePolicyStatusDC = ["id","description","buttons"];

		this.insurancePolicyStatusPaginationSize = 10;
		

		this.insurancePolicyStatusSearchFormGroup = this._formBuilder.group({
			id: [''],
			description: [''],
		});
	}

	private clearFiltersInsurancePolicyStatus() {
		this.insurancePolicyStatusFilters = {
			idEquals: null,
		}
	}

	private async searchInsurancePolicyStatus(page: number) {
		this.insurancePolicyStatusDTOs = null;

		this.insurancePolicyStatusFilters.page = page;
		this.insurancePolicyStatusFilters.size = this.insurancePolicyStatusPaginationSize;
	

		try {                                                                       
			this.insurancePolicyStatusLength = await this.insurancePolicyStatusResourceService.countInsurancePolicyStatusesUsingGET(this.insurancePolicyStatusFilters).toPromise();  
			
			if(this.insurancePolicyStatusLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.insurancePolicyStatusDTOs = [];
				return;
			}

			this.insurancePolicyStatusDTOs =  await this.insurancePolicyStatusResourceService.getAllInsurancePolicyStatusesUsingGET(this.insurancePolicyStatusFilters).toPromise();
	
		} catch (e) {
			this.insurancePolicyStatusError = e;
		}
	}

	

	showAllInsurancePolicyStatus() {
		this.resetFiltersInsurancePolicyStatus();
		
	}

	resetFiltersInsurancePolicyStatus() {
		this.insurancePolicyStatusSearchFormGroup.reset();
		this.clearFiltersInsurancePolicyStatus();
		this.searchInsurancePolicyStatus(0);

	}

	insurancePolicyStatusPaginationEvent(pageEvent: PageEvent) {
		this.insurancePolicyStatusPaginationSize = pageEvent.pageSize;
		this.searchInsurancePolicyStatus(pageEvent.pageIndex);
	}

	insurancePolicyStatusSearchWithFilter() {
		let searchedId = this.insurancePolicyStatusSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersInsurancePolicyStatus();
			this.insurancePolicyStatusSearchFormGroup.reset();
			this.insurancePolicyStatusFilters.idEquals = searchedId;
			this.searchInsurancePolicyStatus(0);
			return;
		}
		this.insurancePolicyStatusFilters.idEquals = null;
		this.insurancePolicyStatusFilters.descriptionContains = this.insurancePolicyStatusSearchFormGroup.controls.description.value;

	

		this.searchInsurancePolicyStatus(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newInsurancePolicyStatus(): void {
        this.dialog.open(AigInsurancePolicyStatusNewUpdateDialogComponent, { data: { insurancePolicyStatus: {} } });
    }

	
}

