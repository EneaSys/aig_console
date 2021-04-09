import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { BuyerDTO, BuyerResourceService, EopooDTO, SellerDTO, SellerResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigBuyerNewUpdateModalComponent } from '../buyer-new-update-modal/buyer-new-update-modal.component';

@Component({
	selector: 'aig-buyer-list-page',
	templateUrl: './buyer-list-page.component.html',
	styleUrls: ['./buyer-list-page.component.scss']
})
export class AigBuyerListPageComponent extends GenericComponent {

	constructor(
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
		private buyerResourceService: BuyerResourceService,
		private sellerResourceService: SellerResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }


	@Input()
    staticSeller: SellerDTO = null;

	filteredSeller: Observable<SellerDTO[]>;

	sellerDTO: SellerDTO;


	loadPage() {
		this.initBuyerSearch();

		this.sellerDTO = this.staticSeller;


		this.showAllBuyer();
	}

	async reloadPage() {
		this.showAllBuyer();

		this.sellerDTO = await this.sellerResourceService.getSellerUsingGET(this.staticSeller.id).toPromise();
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
		this.buyerDC = ["id", "buyer", "statusNote" ,"buttons"];

		this.buyerPaginationSize = 10;


		this.buyerSearchFormGroup = this._formBuilder.group({
			id: [''],
			eopooCode: [''],
			eopoo: [''],
			seller: [''],
			statusNote: [''],
			
		});
	}

	private clearFiltersBuyer() {
		this.buyerFilters = {
			buyerIDEquals: null,
			sellerIDEquals: this.staticSeller ? this.staticSeller.id : null,
			statusNoteContains: null,
			page: 0,
		}
	}

	private async searchBuyer(page: number) {
		this.buyerDTOs = null;

		this.buyerFilters.page = page;
		this.buyerFilters.size = this.buyerPaginationSize;
		this.buyerFilters.buyerIdEquals = null;

		
		this.filteredSeller = this.commerceAutocompleteService.filterSeller(this.buyerSearchFormGroup.controls['seller'].valueChanges);

		try {
			this.buyerLength = await this.buyerResourceService.countBuyersUsingGET(this.buyerFilters).toPromise();
			

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
			this.buyerFilters.buyerIDEquals = searchedId;
			this.searchBuyer(0);
			return;
		} else {
			if(this.buyerSearchFormGroup.controls.seller.value){
				this.buyerFilters.sellerIDEquals = this.buyerSearchFormGroup.controls.seller.value.id;
			}

			if(this.buyerSearchFormGroup.controls.statusNote.value){
				this.buyerFilters.statusNoteContains = this.buyerSearchFormGroup.controls.statusNote.value;
			}
		}
		

		this.searchBuyer(0);
	}

	//			---- !BUYER TABLE AND SEARCH SECTION ----

	newBuyer(sellerDTO: SellerDTO ): void {
		this.dialog.open(AigBuyerNewUpdateModalComponent, { data: { seller: sellerDTO } });
	}

}
