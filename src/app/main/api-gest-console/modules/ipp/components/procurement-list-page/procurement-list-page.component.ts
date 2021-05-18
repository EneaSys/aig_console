import { Component, Input } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ProcurementResourceService, ProcurementDTO } from 'aig-italianlegislation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { AigProcurementNewUpdateDialogComponent } from '../procurement-new-update-dialog/procurement-new-update-dialog.component';
import { IlPpProcurementModalityDTO, IlPpProcurementModalityResourceService } from 'aig-standard';
import { Observable } from 'rxjs';

import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
@Component({
	templateUrl: './procurement-list-page.component.html',
	styleUrls: ['./procurement-list-page.component.scss']
})
export class AigProcurementListPageComponent extends GenericComponent {
	constructor(

		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		private procurementResourceService: ProcurementResourceService,
		private italianPublicProcurementModalityResourceService: IlPpProcurementModalityResourceService,
		private standardAutocompleteFilterService: AigStandardAutocompleteFilterService,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	/*@Input()
	staticItalianPublicProcurementModality: IlPpProcurementModalityDTO = null;*/

	filteredItalianPublicProcurementModality: Observable<IlPpProcurementModalityDTO[]>;

	italianPublicProcurementModalityDTO: IlPpProcurementModalityDTO;

	loadPage() {
		this.initProcurementSearch();

		this.showAllProcurement();
	}

	reloadPage() {
		this.showAllProcurement();
	}

	//			---- TABLE AND SEARCH SECTION ----

	procurementSearchFormGroup: FormGroup;
	procurementPaginationSize: number;
	procurementFilters: any;

	procurementLength: number;
	procurementDTOs: ProcurementDTO[];
	procurementError: any;

	procurementDC: string[];

	private initProcurementSearch() {
		this.procurementDC = ["id", "code", "description", "ref", "contractorEopoo", "ippModality", "ippProcedure", "ippSector", "totalAmount", "procurementStatus", "buttons"];

		this.procurementPaginationSize = 10;

		this.procurementSearchFormGroup = this._formBuilder.group({
			id: [''],
			description: [''],
			ref: [''],
			code: [''],
			contractorEopoo: [''],
			ippModality: [''],
			ippProcedure: [''],
			ippSector: [''],
			totalAmount: [''],
			procurementStatus: [''],
		});
	}

	private clearFiltersProcurement() {
		this.procurementFilters = {
			idEquals: null,
			descriptionContains: null,
			refContains: null,
			codeContains: null,
			contractorEopooCodeContains: null,
			ippModalityEquals: null,
			ippProcedureEquals: null,
			ippSectorEquals: null,
			totalAmountEquals: null,
			procurementStatusEquals: null,
		}
	}

	private async searchProcurement(page: number) {
		this.procurementDTOs = null;

		this.procurementFilters.page = page;
		this.procurementFilters.size = this.procurementPaginationSize;
		/*this.filteredItalianPublicProcurementModality = this.standardAutocompleteFilterService.filterIppModality(this.procurementSearchFormGroup.controls['ippModality'].valueChanges);*/

		try {
			this.procurementLength = await this.procurementResourceService.countProcurementsUsingGET(this.procurementFilters).toPromise();

			if (this.procurementLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.procurementDTOs = [];
				return;
			}

			this.procurementDTOs = await this.procurementResourceService.getAllProcurementsUsingGET(this.procurementFilters).toPromise();

		} catch (e) {
			this.procurementError = e;
		}

	}

	showAllProcurement() {
		this.resetFiltersProcurement();
	}

	resetFiltersProcurement() {
		this.procurementSearchFormGroup.reset();
		this.clearFiltersProcurement();
		this.searchProcurement(0);
	}

	procurementPaginationEvent(pageEvent: PageEvent) {
		this.procurementPaginationSize = pageEvent.pageSize;
		this.searchProcurement(pageEvent.pageIndex);
	}

	procurementSearchWithFilter() {
		let searchedId = this.procurementSearchFormGroup.controls.id.value;

		if (searchedId != null) {
			this.clearFiltersProcurement();
			this.procurementSearchFormGroup.reset();
			this.procurementFilters.idEquals = searchedId;
			this.searchProcurement(0);
			return;
		}

		this.procurementFilters.idEquals = null;
		this.procurementFilters.codeContains = this.procurementSearchFormGroup.controls.code.value;
		this.procurementFilters.refContains = this.procurementSearchFormGroup.controls.ref.value;
		this.procurementFilters.descriptionContains = this.procurementSearchFormGroup.controls.description.value;
		this.procurementFilters.contractorEopooCodeContains = this.procurementSearchFormGroup.controls.contractorEopoo.value;
		this.procurementFilters.totalAmountEquals = this.procurementSearchFormGroup.controls.totalAmount.value;

		this.searchProcurement(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newProcurement(): void {
		this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: {  } });
	}

}