import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { AddressDTO, AddressResourceService } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigAddressNewUpdateModalComponent } from '../address-new-update-modal/address-new-update-modal.component';

@Component({
    selector: 'aig-address-list-page',
    templateUrl: './address-list-page.component.html',
    styleUrls: ['./address-list-page.component.scss']
})
export class AigAddressListPageComponent extends GenericComponent {
    constructor(
        private addressResourceService: AddressResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initAddressSearch();

        this.showAllAddress();
    }

    reloadPage() {
        this.showAllAddress();
    }

    //			---- ADDRESS TABLE AND SEARCH SECTION ----

    addressDTOs: AddressDTO[];
    addressDC: string[];
    addressError: any;

    addressSearchFormGroup: FormGroup;
    addressFilters: any;

    addressPaginationSize: number;
    addressLength: number;

    private initAddressSearch() {
        this.addressPaginationSize = 10;

        this.addressSearchFormGroup = this._formBuilder.group({
            id: [''],
            name: [''],
            address: [''],
        });

        this.addressDC = ["eopooId", "eopooTaxNumber", "id", "name", "address", "city", "buttons"];
    }

    private clearFiltersAddress() {
        this.addressFilters = {
            idEquals: null,
            page: 0,
        }
    }

    private async searchAddress(page: number) {
		this.addressDTOs = null;

		this.addressFilters.page = page;
		this.addressFilters.size = this.addressPaginationSize;

		try {
			this.addressLength = await this.addressResourceService.countAddressesUsingGET(this.addressFilters).toPromise();

			if(this.addressLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.addressDTOs = [];
				return;
			}

			this.addressDTOs = await this.addressResourceService.getAllAddressesUsingGET(this.addressFilters).toPromise();
		} catch (e) {
			this.addressError = e;
		}
    }

    showAllAddress() {
		this.resetFiltersAddress()
    }

    resetFiltersAddress() {
		this.addressSearchFormGroup.reset();
		this.clearFiltersAddress();
		this.searchAddress(0);
    }

    addressPaginationEvent(pageEvent: PageEvent) {
		this.addressPaginationSize = pageEvent.pageSize;
		this.searchAddress(pageEvent.pageIndex);
	}

    addressSearchWithFilter() {
		let searchedId = this.addressSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersAddress();
			this.addressSearchFormGroup.reset();
			this.addressFilters.idEquals = searchedId;
			this.searchAddress(0);
			return;
		}

		this.addressFilters.idEquals = null;

		this.searchAddress(0);
	}

    newAddress() {
        this.dialog.open(AigAddressNewUpdateModalComponent, { data: { address: {} } });
    }
    //			---- !ADDRESS TABLE AND SEARCH SECTION ----
}