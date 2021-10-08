import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { IlFeRegimeFiscaleDTO, IlFeRegimeFiscaleResourceService } from 'aig-standard';
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
		private regimeFiscaleResourceService: IlFeRegimeFiscaleResourceService,
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
	regimeFiscaleDTOs: IlFeRegimeFiscaleDTO[];
	regimeFiscaleError: any;

	regimeFiscaleDC: string[];

	
	private initRegimeFiscaleSearch() {
		this.regimeFiscaleDC = ['code', 'name','activationDate','expirationDate','wikiCode','description', 'buttons'];

		this.regimeFiscalePaginationSize = 10;
		

		this.regimeFiscaleSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
			
		});
	}

	private clearFiltersRegimeFiscale() {
		this.regimeFiscaleFilters = {
			idEquals: null,
			page: 0,
		}
	}

	private async searchRegimeFiscale(page: number) {
		this.regimeFiscaleDTOs = null;

		this.regimeFiscaleFilters.page = page;
		this.regimeFiscaleFilters.size = this.regimeFiscalePaginationSize;

		try {                                                                       
			this.regimeFiscaleLength = await this.regimeFiscaleResourceService.countIlFeRegimeFiscalesUsingGET(this.regimeFiscaleFilters).toPromise();  
			
			if(this.regimeFiscaleLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.regimeFiscaleDTOs = [];
				return;
			}

			this.regimeFiscaleDTOs = await this.regimeFiscaleResourceService.getAllIlFeRegimeFiscalesUsingGET(this.regimeFiscaleFilters).toPromise();
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
			this.regimeFiscaleFilters.idEquals = searchedId;
			this.searchRegimeFiscale(0);
			return;
		}
		this.regimeFiscaleFilters.idEquals = null;

		this.regimeFiscaleFilters.valueContains = this.regimeFiscaleSearchFormGroup.controls.value.value;

		this.searchRegimeFiscale(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newRegimeFiscale(): void {
        this.dialog.open(AigRegimeFiscaleNewUpdateDialogComponent, { data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise();
	}*/
	
}

