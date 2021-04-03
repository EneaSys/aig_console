import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ProcurementResourceService, ProcurementDTO } from 'aig-italian-public-procurement';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { AigProcurementNewUpdateFormComponent } from 'aig-common/modules/ipp/components/procurement-new-update-form/procurement-new-update-form.component';
import { AigProcurementNewUpdateDialogComponent } from '../procurement-new-update-dialog/procurement-new-update-dialog.component';

@Component({
    templateUrl: './ipp-list-page.component.html',
    styleUrls: ['./ipp-list-page.component.scss']
})
export class AigIppListPageComponent extends GenericComponent {
    constructor(
       
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        private procurementResourceService: ProcurementResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

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
		this.procurementDC = ["code","description","ref","amount","SA","sector","procedure","modality", "buttons"];

		this.procurementPaginationSize = 10;
		

		this.procurementSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	private clearFiltersProcurement() {
		this.procurementFilters = {
			idEquals: null,
		}
	}

	private async searchProcurement(page: number) {
		this.procurementDTOs = null;

		this.procurementFilters.page = page;
		this.procurementFilters.size = this.procurementPaginationSize;

		try {                                                                       
			this.procurementLength = await this.procurementResourceService.countProcurementsUsingGET().toPromise();  
			
			if(this.procurementLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.procurementDTOs = [];
				return;
			}

			this.procurementDTOs =  await this.procurementResourceService.getAllProcurementsUsingGET().toPromise();
		console.log(this.procurementDTOs);
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

		if(searchedId != null) {
			this.clearFiltersProcurement();
			this.procurementSearchFormGroup.reset();
			this.procurementFilters.idEquals = searchedId;
			this.searchProcurement(0);
			return;
		}
		this.procurementFilters.idEquals = null;

		this.procurementFilters.nameContains = this.procurementSearchFormGroup.controls.name.value;

		this.searchProcurement(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newProcurement(): void {
        this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: { procurement: {} } });
    }

	
}

