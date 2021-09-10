import { Component, Input } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ProcurementResourceService, ProcurementDTO } from 'aig-italianlegislation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { AigProcurementNewUpdateDialogComponent } from '../procurement-new-update-dialog/procurement-new-update-dialog.component';
import { IlPpProcurementModalityDTO, IlPpProcurementModalityResourceService, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO } from 'aig-standard';
import { Observable } from 'rxjs';

import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigIppGenericComponent } from '../ipp-generic-component';
import { AigStandardAutocompleteDisplayService } from 'aig-common/modules/standard/services/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';


@Component({
	templateUrl: './procurement-list-page.component.html',
	styleUrls: ['./procurement-list-page.component.scss']
})
export class AigProcurementListPageComponent extends AigIppGenericComponent {
	constructor(

		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		private procurementResourceService: ProcurementResourceService,
		private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
		public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
		private standardAutocompleteFilterService: AigStandardAutocompleteFilterService,
		public standardAutocompleteDisplayService:  AigStandardAutocompleteDisplayService, 
		public gcs: AigGenericComponentService,
	) {
		super(gcs)
	}

	/*@Input()
	staticItalianPublicProcurementModality: IlPpProcurementModalityDTO = null;*/



	loadPage() {
		this.initProcurementSearch();

		this.resetFiltersProcurement();
	}

	reloadPage() {
		this.procurementSearchWithFilter();
	}

	//			---- TABLE AND SEARCH SECTION ----

	procurementSearchFormGroup: FormGroup;
	procurementFilters: any;

	filteredContractorEopoo: Observable<EopooDTO[]>;
	filteredProcurementModality: Observable<IlPpProcurementModalityDTO[]>;
	filteredProcurementProcedure: Observable<IlPpProcurementProcedureDTO[]>;
	filteredProcurementSector: Observable<IlPpProcurementSectorDTO[]>;

	private initProcurementSearch() {


		this.procurementSearchFormGroup = this._formBuilder.group({
			id: [''],
			contractorEopoo: [''],
			procurementDescriptionContains: [''],
			totalAmountStart: [''],
			totalAmountEnd: [''],
			procurementRefContains: [''],
			procurementCodeEquals: [''],
			status: [''],
			ilPpProcurementModality: [''],
			ilPpProcurementProcedure: [''],
			ilPpProcurementSector: [''],
		});

		this.filteredContractorEopoo = this.genericAutocompleteFilterService.filterEopoo(this.procurementSearchFormGroup.controls['contractorEopoo'].valueChanges);
		this.filteredProcurementModality = this.standardAutocompleteFilterService.filterIppModality(this.procurementSearchFormGroup.controls['ilPpProcurementModality'].valueChanges);
		this.filteredProcurementProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.procurementSearchFormGroup.controls['ilPpProcurementProcedure'].valueChanges);
		this.filteredProcurementSector = this.standardAutocompleteFilterService.filterIppSector(this.procurementSearchFormGroup.controls['ilPpProcurementSector'].valueChanges);
		
		
	}

	resetFiltersProcurement() {
		this.procurementSearchFormGroup.reset();
		this.procurementSearchWithFilter();
	}

	procurementSearchWithFilter() {
		let filters: any = {};

		let searchedId = this.procurementSearchFormGroup.value.id;
		if (searchedId != null) {
			this.procurementSearchFormGroup.reset();
			filters.procurementIDEquals = searchedId;
		} else {
			filters = this.procurementSearchFormGroup.value;

			if (filters.contractorEopoo){
				filters.contractorEopooCodeEquals = filters.contractorEopoo.id;
				filters.contractorEopoo = null;
			}
			if (filters.totalAmountStart){
				filters.procurementAmountGreaterThanOrEqual = filters.totalAmountStart;
			}
			if (filters.totalAmountEnd){
				filters.procurementAmountLessThanOrEqual = filters.totalAmountEnd;
			}
			filters.procurementCodeEquals = (filters.procurementCodeEquals != "") ? filters.procurementCodeEquals : null;
			if (filters.ilPpProcurementModality) {
				filters.procurementModalityCodeEquals = filters.ilPpProcurementModality.code;
				filters.ilPpProcurementModality = null;
			}
			if (filters.ilPpProcurementProcedure) {
				filters.procurementProcedureCodeEquals = filters.ilPpProcurementProcedure.code;
				filters.ilPpProcurementProcedure = null;
			}
			if (filters.ilPpProcurementSector) {
				filters.procurementSectorCodeEquals = filters.ilPpProcurementSector.code;
				filters.ilPpProcurementSector = null;
			}
		}
		this.procurementFilters = filters;
	}

	//			---- PROCUREMENT LOT TABLE SECTION ----




	newTableColumns: string[] = ['_ck', 'contractorEopoo', 'description', 'modality', 'procedure', 'status'];
	newTableButtons: any[] = [
		
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "primary",
			class: "mt-4",
			command: (e: any) => {
				this.gcs.router.navigateByUrl("/ipp/procurement/detail/" + e.id);
			},
		},
		{
			label: "Edit",
			hideLabel: true,
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "mt-4 ml-4",
			command: (e: any) => {
				this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: { procurement: e } });
			}
		},{
			label: "Delete",
			hideLabel: true,
			icon: "pi pi-trash",
			severity: "danger",
			class: "mt-4  ml-4",
			command: async (e: any) => {
				this.gcs.fuseProgressBarService.show();
				try {
					await this.procurementResourceService.deleteProcurementUsingDELETE(e.id).toPromise();
					this._snackBar.open(`Procurement: '${e.id}' deleted.`, null, { duration: 2000, });
					this.gcs.eventService.reloadCurrentPage();
				} catch (e) {
					this._snackBar.open(`Error during deleting procurement : '${e.id}'. (${e.message})`, null, { duration: 5000, });
				}
				this.gcs.fuseProgressBarService.hide();
			}
		}
	]

	

	//			---- !TABLE AND SEARCH SECTION ----

	newProcurement(): void {
		this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: {  } });
	}

	
	async publish() {
		await this.procurementResourceService.publishUsingGET7(this.procurementFilters).toPromise();
	}

}