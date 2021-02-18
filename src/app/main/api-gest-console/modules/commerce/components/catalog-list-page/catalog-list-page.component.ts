import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { CatalogDTO, CatalogResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCatalogNewUpdateDialogComponent } from '../catalog-new-update-dialog/catalog-new-update-dialog.component';

@Component({
	selector: 'catalog-list-page',
	templateUrl: './catalog-list-page.component.html',
	styleUrls: ['./catalog-list-page.component.scss']
})
export class AigCatalogListPageComponent extends GenericComponent {
	constructor(
		private catalogResourceService: CatalogResourceService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initCatalogSearch()
		
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

	private initCatalogSearch() {
		this.catalogPaginationSize = 10;

		this.catalogSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			seller: [''],
		});

		this.catalogDC = ["id", "name", "seller", "buttons"];
	}

	private clearFiltersCatalog() {
		this.catalogFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
			
		}
	}

	private async searchCatalog(page: number) {
		this.catalogDTOs = null;

		this.catalogFilters.page = page;
		this.catalogFilters.size = this.catalogPaginationSize;

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
			this.catalogFilters.idEquals = searchedId;
			this.searchCatalog(0);
			return;
		}
		this.catalogFilters.idEquals = null;

		this.catalogFilters.nameContains = this.catalogSearchFormGroup.controls.name.value;

		this.searchCatalog(0);
	}
	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----

	newCatalog(): void {
        this.dialog.open(AigCatalogNewUpdateDialogComponent, { data: { catalog: {} } });
    }

}