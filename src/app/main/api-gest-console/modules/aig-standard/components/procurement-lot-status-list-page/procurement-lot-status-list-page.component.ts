import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlPpProcurementLotStatusDTO, IlPpProcurementLotStatusResourceService, IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigProcurementStatusNewUpdateDialogComponent } from '../procurement-status-new-update-dialog/procurement-status-new-update-dialog.component';
import { AigProcurementLotStatusNewUpdateDialogComponent } from '../procurement-lot-status-new-update-dialog/procurement-lot-status-new-update-dialog.component';

@Component({
    selector: 'aig-procurement-lot-status-list-page',
    templateUrl: './procurement-lot-status-list-page.component.html',
    styleUrls: ['./procurement-lot-status-list-page.component.scss']
})
export class AigProcurementLotStatusListPageComponent extends GenericComponent {
    constructor(
        private procurementLotStatusResourceService: IlPpProcurementLotStatusResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initProcurementLotStatusSearch();

		this.showAllProcurementLotStatus();
	}

	reloadPage() {
		this.showAllProcurementLotStatus();
	}

    //			---- Procurement Lot Status  TABLE AND SEARCH SECTION ----
    
	procurementLotStatusDTOs: IlPpProcurementLotStatusDTO[];
    procurementLotStatusDC: string[];
	procurementLotStatusError: any;

    procurementLotStatusSearchFormGroup: FormGroup;
	procurementLotStatusFilters: any;

	procurementLotStatusPaginationSize: number;
	procurementLotStatusLength: number;

    
    private initProcurementLotStatusSearch() {
		this.procurementLotStatusPaginationSize = 10;

		this.procurementLotStatusSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});

		this.procurementLotStatusDC = ['code', 'name','activationDate','expirationDate','wikiCode','description', 'buttons'];
    }
    
    private clearFiltersProcurementLotStatus() {
		this.procurementLotStatusFilters = {
			idEquals: null,
			page: 0,
		}
    }
    
    private async searchProcurementLotStatus(page: number) {
		this.procurementLotStatusDTOs = null;

		this.procurementLotStatusFilters.page = page;
		this.procurementLotStatusFilters.size = this.procurementLotStatusPaginationSize;

		try {
			this.procurementLotStatusLength = await this.procurementLotStatusResourceService.countIlPpProcurementLotStatusesUsingGET(this.procurementLotStatusFilters).toPromise();

			if(this.procurementLotStatusLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.procurementLotStatusDTOs = [];
				return;
			}

			this.procurementLotStatusDTOs = await this.procurementLotStatusResourceService.getAllIlPpProcurementLotStatusesUsingGET(this.procurementLotStatusFilters).toPromise();
		} catch (e) {
			this.procurementLotStatusError = e;
		}
    }
    
    showAllProcurementLotStatus() {
		this.resetFiltersProcurementLotStatus()
    }
    
    resetFiltersProcurementLotStatus() {
		this.procurementLotStatusSearchFormGroup.reset();
		this.clearFiltersProcurementLotStatus();
		this.searchProcurementLotStatus(0);
    }
    
    procurementLotStatusPaginationEvent(pageEvent: PageEvent) {
		this.procurementLotStatusPaginationSize = pageEvent.pageSize;
		this.searchProcurementLotStatus(pageEvent.pageIndex);
	}

    procurementLotStatusSearchWithFilter() {
		let searchedId = this.procurementLotStatusSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersProcurementLotStatus();
			this.procurementLotStatusSearchFormGroup.reset();
			this.procurementLotStatusFilters.idEquals = searchedId;
			this.searchProcurementLotStatus(0);
			return;
		}

		this.procurementLotStatusFilters.idEquals = null;

		this.procurementLotStatusFilters.nameContains = this.procurementLotStatusSearchFormGroup.controls.name.value;

		this.searchProcurementLotStatus(0);
	}

    newProcurementLotStatus(){
        this.dialog.open(AigProcurementLotStatusNewUpdateDialogComponent, {data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/

	
    //			---- !procurement Lot Status TABLE AND SEARCH SECTION ----
}