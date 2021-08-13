import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigProcurementStatusNewUpdateDialogComponent } from '../procurement-status-new-update-dialog/procurement-status-new-update-dialog.component';

@Component({
    selector: 'aig-procurement-status-list-page',
    templateUrl: './procurement-status-list-page.component.html',
    styleUrls: ['./procurement-status-list-page.component.scss']
})
export class AigProcurementStatusListPageComponent extends GenericComponent {
    constructor(
        private procurementStatusResourceService: IlPpProcurementStatusResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initProcurementStatusSearch();

		this.showAllProcurementStatus();
	}

	reloadPage() {
		this.showAllProcurementStatus();
	}

    //			---- Procurement Status  TABLE AND SEARCH SECTION ----
    
	procurementStatusDTOs: IlPpProcurementStatusDTO[];
    procurementStatusDC: string[];
	procurementStatusError: any;

    procurementStatusSearchFormGroup: FormGroup;
	procurementStatusFilters: any;

	procurementStatusPaginationSize: number;
	procurementStatusLength: number;

    
    private initProcurementStatusSearch() {
		this.procurementStatusPaginationSize = 10;

		this.procurementStatusSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});

		this.procurementStatusDC = ['id','code', 'name','description','wikiCode', 'buttons'];
    }
    
    private clearFiltersProcurementStatus() {
		this.procurementStatusFilters = {
			idEquals: null,
			page: 0,
		}
    }
    
    private async searchProcurementStatus(page: number) {
		this.procurementStatusDTOs = null;

		this.procurementStatusFilters.page = page;
		this.procurementStatusFilters.size = this.procurementStatusPaginationSize;

		try {
			this.procurementStatusLength = await this.procurementStatusResourceService.countIlPpProcurementStatusesUsingGET(this.procurementStatusFilters).toPromise();

			if(this.procurementStatusLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.procurementStatusDTOs = [];
				return;
			}

			this.procurementStatusDTOs = await this.procurementStatusResourceService.getAllIlPpProcurementStatusesUsingGET(this.procurementStatusFilters).toPromise();
		} catch (e) {
			this.procurementStatusError = e;
		}
    }
    
    showAllProcurementStatus() {
		this.resetFiltersProcurementStatus()
    }
    
    resetFiltersProcurementStatus() {
		this.procurementStatusSearchFormGroup.reset();
		this.clearFiltersProcurementStatus();
		this.searchProcurementStatus(0);
    }
    
    procurementStatusPaginationEvent(pageEvent: PageEvent) {
		this.procurementStatusPaginationSize = pageEvent.pageSize;
		this.searchProcurementStatus(pageEvent.pageIndex);
	}

    procurementStatusSearchWithFilter() {
		let searchedId = this.procurementStatusSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersProcurementStatus();
			this.procurementStatusSearchFormGroup.reset();
			this.procurementStatusFilters.idEquals = searchedId;
			this.searchProcurementStatus(0);
			return;
		}

		this.procurementStatusFilters.idEquals = null;

		this.procurementStatusFilters.nameContains = this.procurementStatusSearchFormGroup.controls.name.value;

		this.searchProcurementStatus(0);
	}

    newProcurementStatus(){
        this.dialog.open(AigProcurementStatusNewUpdateDialogComponent, {data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/

	
    //			---- !procurement Status TABLE AND SEARCH SECTION ----
}