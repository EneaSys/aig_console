import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { CatalogDTO, CatalogResourceService, SellerDTO } from 'aig-commerce';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigCatalogNewUpdateDialogComponent } from '../catalog-new-update-dialog/catalog-new-update-dialog.component';

@Component({
	selector: 'catalog-list-page',
	templateUrl: './catalog-list-page.component.html',
	styleUrls: ['./catalog-list-page.component.scss']
})
export class AigCatalogListPageComponent extends GenericComponent {
	constructor(
		private catalogResourceService: CatalogResourceService,
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initCatalogSearch();
		
		this.showAllCatalog();
	}

	reloadPage() {
		this.showAllCatalog();
	}

	//			---- CATALOG TABLE AND SEARCH SECTION ----

	catalogDTOs: CatalogDTO[];
	catalogDC: string[];
	catalogError: any;

	catalogSearchFormGroup: FormGroup;
	catalogFilters: any;

	catalogPaginationSize: number;
	catalogLength: number;

	filteredSeller: Observable<SellerDTO[]>;

	private initCatalogSearch() {
		this.catalogPaginationSize = 10;

		this.catalogSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			seller: [''],
		});

		this.filteredSeller = this.commerceAutocompleteService.filterSeller(this.catalogSearchFormGroup.controls['seller'].valueChanges);

		this.catalogDC = ["id", "name", "seller", "buttons"];
	}

	private clearFiltersCatalog() {
		this.catalogFilters = {
			catalogIDEquals: null,
			catalogNameContains: null,
			sellerIDEquals: null,
			page: 0,
			
		}
	}

	private async searchCatalog(page: number) {
		this.catalogDTOs = null;

		this.catalogFilters.page = page;
		this.catalogFilters.size = this.catalogPaginationSize;

		this.filteredSeller = this.commerceAutocompleteService.filterSeller(this.catalogSearchFormGroup.controls['seller'].valueChanges);

		try {
			this.catalogLength = await this.catalogResourceService.countCatalogsUsingGET(this.catalogFilters).toPromise();

			if(this.catalogLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.catalogDTOs = [];
				return;
			}

			this.catalogDTOs = await this.catalogResourceService.getAllCatalogsUsingGET(this.catalogFilters).toPromise();
		} catch (e) {
			this.catalogError = e;
		}
	}

	showAllCatalog() {
		this.resetFiltersCatalog()
	}

	resetFiltersCatalog() {
		this.catalogSearchFormGroup.reset();
		this.clearFiltersCatalog();
		this.searchCatalog(0);
	}

	catalogPaginationEvent(pageEvent: PageEvent) {
		this.catalogPaginationSize = pageEvent.pageSize;
		this.searchCatalog(pageEvent.pageIndex);
	}

	catalogSearchWithFilter() {
		let searchedId = this.catalogSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersCatalog();
			this.catalogSearchFormGroup.reset();
			this.catalogFilters.catalogIDEquals = searchedId;
			this.searchCatalog(0);
			return;
		}
		this.catalogFilters.catalogIDEquals = null;

		this.catalogFilters.catalogNameContains = this.catalogSearchFormGroup.controls.name.value;

		if (this.catalogSearchFormGroup.controls.seller.value) {
			this.catalogFilters.sellerIDEquals = this.catalogSearchFormGroup.controls.seller.value.id;
		}

		this.searchCatalog(0);
	}
	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----

	newCatalog(): void {
        this.dialog.open(AigCatalogNewUpdateDialogComponent, { data: { catalog: {} } });
    }

}