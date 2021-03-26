import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { BuyerDTO, BuyerResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigBuyerNewUpdateModalComponent } from '../buyer-new-update-modal/buyer-new-update-modal.component';

@Component({
	selector: 'aig-buyer-list-page',
	templateUrl: './buyer-list-page.component.html',
	styleUrls: ['./buyer-list-page.component.scss']
})
export class AigBuyerListPageComponent extends GenericComponent {

	constructor(
		private buyerResourceService: BuyerResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }



	loadPage() {
		this.initBuyerSearch();

		this.showAllBuyer();
	}

	reloadPage() {
		this.showAllBuyer();
	}


	//			---- BUYER TABLE AND SEARCH SECTION ----

	buyerSearchFormGroup: FormGroup;
	buyerPaginationSize: number;
	buyerFilters: any;

	buyerLength: number;
	buyerDTOs: BuyerDTO[];
	buyerError: any;

	buyerDC: string[];


	private initBuyerSearch() {
		this.buyerDC = ["id", "buyer", "status", "seller", "buttons"];

		this.buyerPaginationSize = 10;


		this.buyerSearchFormGroup = this._formBuilder.group({
			id: [''],
			eopooCode: [''],
			
		});
	}

	private clearFiltersBuyer() {
		this.buyerFilters = {
			idEquals: null,
			eopooCodeContains: null,
			page: 0,
		}
	}

	private async searchBuyer(page: number) {
		this.buyerDTOs = null;

		this.buyerFilters.page = page;
		this.buyerFilters.size = this.buyerPaginationSize;

		try {
			this.buyerLength = await this.buyerResourceService.countBuyersUsingGET(this.buyerFilters,).toPromise();

			if (this.buyerLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.buyerDTOs = [];
				return;
			}

			this.buyerDTOs = await this.buyerResourceService.getAllBuyersUsingGET(this.buyerFilters).toPromise();
		} catch (e) {
			this.buyerError = e;
		}
	}


	showAllBuyer() {
		this.resetFiltersBuyer();

	}

	resetFiltersBuyer() {
		this.buyerSearchFormGroup.reset();
		this.clearFiltersBuyer();
		this.searchBuyer(0);

	}

	buyerPaginationEvent(pageEvent: PageEvent) {
		this.buyerPaginationSize = pageEvent.pageSize;
		this.searchBuyer(pageEvent.pageIndex);
	}

	buyerSearchWithFilter() {
		let searchedId = this.buyerSearchFormGroup.controls.id.value;

		if (searchedId != null) {
			this.clearFiltersBuyer();
			this.buyerSearchFormGroup.reset();
			this.buyerFilters.idEquals = searchedId;
			this.searchBuyer(0);
			return;
		}
		this.buyerFilters.idEquals = null;

		this.buyerFilters.eopooCodeContains = this.buyerSearchFormGroup.controls.name.value;

		this.searchBuyer(0);
	}

	//			---- !BUYER TABLE AND SEARCH SECTION ----

	newBuyer(): void {
		this.dialog.open(AigBuyerNewUpdateModalComponent, { data: { buyer: {} } });
	}

}
