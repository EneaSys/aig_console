import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlPpProcurementSectorDTO, IlPpProcurementSectorResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppSectorNewUpdateModalComponent } from '../ipp-sector-new-update-modal/ipp-sector-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    selector: 'aig-ipp-sector-list-page',
    templateUrl: './ipp-sector-list-page.component.html',
    styleUrls: ['./ipp-sector-list-page.component.scss']
})
export class AigIppSectorListPageComponent extends GenericComponent {
    constructor(
        private ippSectorResourceService: IlPpProcurementSectorResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initIppSectorSearch();

		this.showAllIppSector();
	}

	reloadPage() {
		this.showAllIppSector();
	}

    //			---- IPP SECTOR TABLE AND SEARCH SECTION ----
    
	ippSectorDTOs: IlPpProcurementSectorDTO[];
    ippSectorDC: string[];
	ippSectorError: any;

    ippSectorSearchFormGroup: FormGroup;
	ippSectorFilters: any;

	ippSectorPaginationSize: number;
	ippSectorLength: number;

    
    private initIppSectorSearch() {
		this.ippSectorPaginationSize = 10;

		this.ippSectorSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});

		this.ippSectorDC = ['id','description', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersIppSector() {
		this.ippSectorFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchIppSector(page: number) {
		this.ippSectorDTOs = null;

		this.ippSectorFilters.page = page;
		this.ippSectorFilters.size = this.ippSectorPaginationSize;

		try {
			this.ippSectorLength = await this.ippSectorResourceService.countIlPpProcurementSectorsUsingGET(this.ippSectorFilters).toPromise();

			if(this.ippSectorLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.ippSectorDTOs = [];
				return;
			}

			this.ippSectorDTOs = await this.ippSectorResourceService.getAllIlPpProcurementSectorsUsingGET(this.ippSectorFilters).toPromise();
		} catch (e) {
			this.ippSectorError = e;
		}
    }
    
    showAllIppSector() {
		this.resetFiltersIppSector()
    }
    
    resetFiltersIppSector() {
		this.ippSectorSearchFormGroup.reset();
		this.clearFiltersIppSector();
		this.searchIppSector(0);
    }
    
    ippSectorPaginationEvent(pageEvent: PageEvent) {
		this.ippSectorPaginationSize = pageEvent.pageSize;
		this.searchIppSector(pageEvent.pageIndex);
	}

    ippSectorSearchWithFilter() {
		let searchedId = this.ippSectorSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersIppSector();
			this.ippSectorSearchFormGroup.reset();
			this.ippSectorFilters.idEquals = searchedId;
			this.searchIppSector(0);
			return;
		}

		this.ippSectorFilters.idEquals = null;

		this.ippSectorFilters.nameContains = this.ippSectorSearchFormGroup.controls.name.value;

		this.searchIppSector(0);
	}

    newIppSector(){
        this.dialog.open(AigIppSectorNewUpdateModalComponent, {data: { ippSector: {} } });
    }
    //			---- !IPP SECTOR TABLE AND SEARCH SECTION ----
}