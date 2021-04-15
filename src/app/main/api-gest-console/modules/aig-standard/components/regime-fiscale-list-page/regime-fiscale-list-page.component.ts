import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { AigRegimeFiscaleNewUpdateFormComponent } from 'aig-common/modules/standard/components/regime-fiscale-new-update-form/regime-fiscale-new-update-form.component';
import { RegimeFiscaleDTO, RegimeFiscaleResourceService } from 'aig-standard';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigRegimeFiscaleNewUpdateDialogComponent } from '../regime-fiscale-new-update-dialog/regime-fiscale-new-update-dialog.component';


@Component({
	selector: 'aig-regime-fiscale-list-page',
	templateUrl: './regime-fiscale-list-page.component.html',
	styleUrls: ['./regime-fiscale-list-page.component.scss']
})
export class AigRegimeFiscaleListPageComponent extends GenericComponent {
	constructor(
		private regimeFiscaleResourceService: RegimeFiscaleResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	
	
	loadPage() {
		this.initRegimeFiscaleSearch();

		this.showAllRegimeFiscale();
	}

	reloadPage() {
		this.showAllRegimeFiscale();
	}


//			---- TABLE AND SEARCH SECTION ----

    regimeFiscaleSearchFormGroup: FormGroup;
	regimeFiscalePaginationSize: number;
	regimeFiscaleFilters: any;

	regimeFiscaleLength: number;
	regimeFiscaleDTOs: RegimeFiscaleDTO[];
	regimeFiscaleError: any;

	regimeFiscaleDC: string[];

	
	private initRegimeFiscaleSearch() {
		this.regimeFiscaleDC = ["id", "value","description", "buttons"];

		this.regimeFiscalePaginationSize = 10;
		

		this.regimeFiscaleSearchFormGroup = this._formBuilder.group({
			id: [''],
			value: [''],
			
		});
	}

	private clearFiltersRegimeFiscale() {
		this.regimeFiscaleFilters = {
			regimeFiscaleIDEquals: null,
			regimeFiscaleNameContains: null,
			page: 0,
		}
	}

	private async searchRegimeFiscale(page: number) {
		this.regimeFiscaleDTOs = null;

		this.regimeFiscaleFilters.page = page;
		this.regimeFiscaleFilters.size = this.regimeFiscalePaginationSize;

		try {                                                                       
			this.regimeFiscaleLength = await this.regimeFiscaleResourceService.countRegimeFiscalesUsingGET(this.regimeFiscaleFilters).toPromise();  
			
			if(this.regimeFiscaleLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.regimeFiscaleDTOs = [];
				return;
			}

			this.regimeFiscaleDTOs = await this.regimeFiscaleResourceService.getAllRegimeFiscalesUsingGET(this.regimeFiscaleFilters).toPromise();
		} catch (e) {
			this.regimeFiscaleError = e;
		}
	}
	

	showAllRegimeFiscale() {
		this.resetFiltersRegimeFiscale();
		
	}

	resetFiltersRegimeFiscale() {
		this.regimeFiscaleSearchFormGroup.reset();
		this.clearFiltersRegimeFiscale();
		this.searchRegimeFiscale(0);

	}

	regimeFiscalePaginationEvent(pageEvent: PageEvent) {
		this.regimeFiscalePaginationSize = pageEvent.pageSize;
		this.searchRegimeFiscale(pageEvent.pageIndex);
	}

	regimeFiscaleSearchWithFilter() {
		let searchedId = this.regimeFiscaleSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersRegimeFiscale();
			this.regimeFiscaleSearchFormGroup.reset();
			this.regimeFiscaleFilters.warehouseIDEquals = searchedId;
			this.searchRegimeFiscale(0);
			return;
		}
		this.regimeFiscaleFilters.regimeFiscaleIDEquals = null;

		this.regimeFiscaleFilters.regimeFiscaleNameContains = this.regimeFiscaleSearchFormGroup.controls.name.value;

		this.searchRegimeFiscale(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newRegimeFiscale(): void {
        this.dialog.open(AigRegimeFiscaleNewUpdateDialogComponent, { data: {regimeFiscale: {} } });
    }

	
}

