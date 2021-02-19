import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { PriceListDTO, PriceListResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPriceListNewUpdateDialogComponent } from '../price-list-new-update-dialog/price-list-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-list-page',
    templateUrl: './price-list-list-page.component.html',
    styleUrls: ['./price-list-list-page.component.scss']
})
export class AigPriceListListPageComponent extends GenericComponent {
	constructor(
		private priceListResourceService: PriceListResourceService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initPriceListSearch()
		
		this.showAllPriceList();
	}

	reloadPage() {
		this.showAllPriceList();
	}

	//			---- CATALOG TABLE AND SEARCH SECTION ----

	priceListDTOs: PriceListDTO[];
	priceListDC: string[];
	priceListError: any;

	priceListSearchFormGroup: FormGroup;
	priceListFilters: any;

	priceListPaginationSize: number;
	priceListLength: number;

	private initPriceListSearch() {
		this.priceListPaginationSize = 10;

		this.priceListSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
            catalog: ['']
		});

		this.priceListDC = ["id", "name", "catalogId", "catalog", "buttons"];
	}

	private clearFiltersPriceList() {
		this.priceListFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
			
		}
	}

	private async searchPriceList(page: number) {
		this.priceListDTOs = null;

		this.priceListFilters.page = page;
		this.priceListFilters.size = this.priceListPaginationSize;

		try {
			this.priceListLength = await this.priceListResourceService.countPriceListsUsingGET(this.priceListFilters).toPromise();

			if(this.priceListLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.priceListDTOs = [];
				return;
			}

			this.priceListDTOs = await this.priceListResourceService.getAllPriceListsUsingGET(this.priceListFilters).toPromise();
		} catch (e) {
			this.priceListError = e;
		}
	}

	showAllPriceList() {
		this.resetFiltersPriceList()
	}

	resetFiltersPriceList() {
		this.priceListSearchFormGroup.reset();
		this.clearFiltersPriceList();
		this.searchPriceList(0);
	}

	priceListPaginationEvent(pageEvent: PageEvent) {
		this.priceListPaginationSize = pageEvent.pageSize;
		this.searchPriceList(pageEvent.pageIndex);
	}

	priceListSearchWithFilter() {
		let searchedId = this.priceListSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPriceList();
			this.priceListSearchFormGroup.reset();
			this.priceListFilters.idEquals = searchedId;
			this.searchPriceList(0);
			return;
		}
		this.priceListFilters.idEquals = null;

		this.priceListFilters.nameContains = this.priceListSearchFormGroup.controls.name.value;

		this.searchPriceList(0);
	}
	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----

	newPriceList(): void {
        this.dialog.open(AigPriceListNewUpdateDialogComponent, { data: { priceList: {} } });
    }

}