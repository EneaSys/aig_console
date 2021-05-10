import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlPpProcurementProcedureDTO, IlPpProcurementProcedureResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppProcedureNewUpdateModalComponent } from '../ipp-procedure-new-update-modal/ipp-procedure-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    selector: 'aig-ipp-procedure-list-page',
    templateUrl: './ipp-procedure-list-page.component.html',
    styleUrls: ['./ipp-procedure-list-page.component.scss']
})
export class AigIppProcedureListPageComponent extends GenericComponent {
    constructor(
        private ippProcedureResourceService: IlPpProcurementProcedureResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initIppProcedureSearch();

		this.showAllIppProcedure();
	}

	reloadPage() {
		this.showAllIppProcedure();
	}

    //			---- IPP PROCEDURE TABLE AND SEARCH SECTION ----
    
	ippProcedureDTOs: IlPpProcurementProcedureDTO[];
    ippProcedureDC: string[];
	ippProcedureError: any;

    ippProcedureSearchFormGroup: FormGroup;
	ippProcedureFilters: any;

	ippProcedurePaginationSize: number;
	ippProcedureLength: number;

    
    private initIppProcedureSearch() {
		this.ippProcedurePaginationSize = 10;

		this.ippProcedureSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});

		this.ippProcedureDC = ['id','description', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersIppProcedure() {
		this.ippProcedureFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchIppProcedure(page: number) {
		this.ippProcedureDTOs = null;

		this.ippProcedureFilters.page = page;
		this.ippProcedureFilters.size = this.ippProcedurePaginationSize;

		try {
			this.ippProcedureLength = await this.ippProcedureResourceService.countIlPpProcurementProceduresUsingGET(this.ippProcedureFilters).toPromise();

			if(this.ippProcedureLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.ippProcedureDTOs = [];
				return;
			}

			this.ippProcedureDTOs = await this.ippProcedureResourceService.getAllIlPpProcurementProceduresUsingGET(this.ippProcedureFilters).toPromise();
		} catch (e) {
			this.ippProcedureError = e;
		}
    }
    
    showAllIppProcedure() {
		this.resetFiltersIppProcedure()
    }
    
    resetFiltersIppProcedure() {
		this.ippProcedureSearchFormGroup.reset();
		this.clearFiltersIppProcedure();
		this.searchIppProcedure(0);
    }
    
    ippProcedurePaginationEvent(pageEvent: PageEvent) {
		this.ippProcedurePaginationSize = pageEvent.pageSize;
		this.searchIppProcedure(pageEvent.pageIndex);
	}

    ippProcedureSearchWithFilter() {
		let searchedId = this.ippProcedureSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersIppProcedure();
			this.ippProcedureSearchFormGroup.reset();
			this.ippProcedureFilters.idEquals = searchedId;
			this.searchIppProcedure(0);
			return;
		}

		this.ippProcedureFilters.idEquals = null;

		this.ippProcedureFilters.nameContains = this.ippProcedureSearchFormGroup.controls.name.value;

		this.searchIppProcedure(0);
	}

    newIppProcedure(){
        this.dialog.open(AigIppProcedureNewUpdateModalComponent, {data: { ippProcedure: {} } });
    }
    //			---- !IPP PROCEDURE TABLE AND SEARCH SECTION ----
}