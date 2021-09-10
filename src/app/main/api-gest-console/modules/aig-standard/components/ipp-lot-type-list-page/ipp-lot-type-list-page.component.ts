import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlPpProcurementLotTypeDTO, IlPpProcurementLotTypeResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppLotTypeNewUpdateModalComponent } from '../ipp-lot-type-new-update-modal/ipp-lot-type-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    selector: 'aig-ipp-lot-type-list-page',
    templateUrl: './ipp-lot-type-list-page.component.html',
    styleUrls: ['./ipp-lot-type-list-page.component.scss']
})
export class AigIppLotTypeListPageComponent extends GenericComponent {
    constructor(
        private ippLotTypeResourceService: IlPpProcurementLotTypeResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initIppLotTypeSearch();

		this.showAllIppLotType();
	}

	reloadPage() {
		this.showAllIppLotType();
	}

    //			---- IPP LOT TYPE TABLE AND SEARCH SECTION ----
    
	ippLotTypeDTOs: IlPpProcurementLotTypeDTO[];
    ippLotTypeDC: string[];
	ippLotTypeError: any;

    ippLotTypeSearchFormGroup: FormGroup;
	ippLotTypeFilters: any;

	ippLotTypePaginationSize: number;
	ippLotTypeLength: number;

    
    private initIppLotTypeSearch() {
		this.ippLotTypePaginationSize = 10;

		this.ippLotTypeSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});

		this.ippLotTypeDC = ['code', 'name','activationDate','expirationDate','wikiCode','description', 'buttons'];
    }
    
    private clearFiltersIppLotType() {
		this.ippLotTypeFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchIppLotType(page: number) {
		this.ippLotTypeDTOs = null;

		this.ippLotTypeFilters.page = page;
		this.ippLotTypeFilters.size = this.ippLotTypePaginationSize;

		try {
			this.ippLotTypeLength = await this.ippLotTypeResourceService.countIlPpProcurementLotTypesUsingGET(this.ippLotTypeFilters).toPromise();

			if(this.ippLotTypeLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.ippLotTypeDTOs = [];
				return;
			}

			this.ippLotTypeDTOs = await this.ippLotTypeResourceService.getAllIlPpProcurementLotTypesUsingGET(this.ippLotTypeFilters).toPromise();
		} catch (e) {
			this.ippLotTypeError = e;
		}
    }
    
    showAllIppLotType() {
		this.resetFiltersIppLotType()
    }
    
    resetFiltersIppLotType() {
		this.ippLotTypeSearchFormGroup.reset();
		this.clearFiltersIppLotType();
		this.searchIppLotType(0);
    }
    
    ippLotTypePaginationEvent(pageEvent: PageEvent) {
		this.ippLotTypePaginationSize = pageEvent.pageSize;
		this.searchIppLotType(pageEvent.pageIndex);
	}

    ippLotTypeSearchWithFilter() {
		let searchedId = this.ippLotTypeSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersIppLotType();
			this.ippLotTypeSearchFormGroup.reset();
			this.ippLotTypeFilters.idEquals = searchedId;
			this.searchIppLotType(0);
			return;
		}

		this.ippLotTypeFilters.idEquals = null;

		this.ippLotTypeFilters.nameContains = this.ippLotTypeSearchFormGroup.controls.name.value;

		this.searchIppLotType(0);
	}

    newIppLotType(){
        this.dialog.open(AigIppLotTypeNewUpdateModalComponent, {data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/
	
    //			---- !IPP LOT TYPE TABLE AND SEARCH SECTION ----
}