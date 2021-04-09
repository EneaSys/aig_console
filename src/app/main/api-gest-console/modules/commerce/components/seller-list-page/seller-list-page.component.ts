import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SellerResourceService, SellerDTO } from 'aig-commerce';
import { AigSellerNewUpdateDialogComponent } from '../seller-new-update-dialog/seller-new-update-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    templateUrl: './seller-list-page.component.html',
    styleUrls: ['./seller-list-page.component.scss']
})
export class AigSellerListPageComponent extends GenericComponent {
    constructor(
        private sellerResourceService: SellerResourceService,
        private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initSellerSearch();

		this.showAllSeller();
	}

	reloadPage() {
		this.showAllSeller();
	}

    //			---- SELLER TABLE AND SEARCH SECTION ----

	sellerSearchFormGroup: FormGroup;
	sellerPaginationSize: number;
	sellerFilters: any;

	sellerLength: number;
	sellerDTOs: SellerDTO[];
	sellerError: any;

	sellerDC: string[];

	
	private initSellerSearch() {
		this.sellerDC = ["id", "name", "buttons"];

		this.sellerPaginationSize = 10;
		

		this.sellerSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	private clearFiltersSeller() {
		this.sellerFilters = {
			sellerIdEquals: null,
			sellerNameContains: null,
			page: 0,
		}
	}

	private async searchSeller(page: number) {
		this.sellerDTOs = null;

		this.sellerFilters.page = page;
		this.sellerFilters.size = this.sellerPaginationSize;

		try {                                                                       
			this.sellerLength = await this.sellerResourceService.countSellersUsingGET(this.sellerFilters).toPromise();  
			
			if(this.sellerLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.sellerDTOs = [];
				return;
			}

			this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET(this.sellerFilters,).toPromise();
		} catch (e) {
			this.sellerError = e;
		}
	}
	

	showAllSeller() {
		this.resetFiltersSeller();
		
	}

	resetFiltersSeller() {
		this.sellerSearchFormGroup.reset();
		this.clearFiltersSeller();
		this.searchSeller(0);

	}

	sellerPaginationEvent(pageEvent: PageEvent) {
		this.sellerPaginationSize = pageEvent.pageSize;
		this.searchSeller(pageEvent.pageIndex);
	}

	sellerSearchWithFilter() {
		let searchedId = this.sellerSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersSeller();
			this.sellerSearchFormGroup.reset();
			this.sellerFilters.idEquals = searchedId;
			this.searchSeller(0);
			return;
		}
		this.sellerFilters.idEquals = null;

		this.sellerFilters.nameContains = this.sellerSearchFormGroup.controls.name.value;

		this.searchSeller(0);
	}

	//			---- !SELLER TABLE AND SEARCH SECTION ----

    newSeller() {
		this.dialog.open(AigSellerNewUpdateDialogComponent, { data: { seller: {} } });
	}
	
}
