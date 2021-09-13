import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { AddressDTO, AddressResourceService, EopooDTO } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigAddressNewUpdateModalComponent } from '../address-new-update-modal/address-new-update-modal.component';

@Component({
    selector: 'aig-address-list-page',
    templateUrl: './address-list-page.component.html',
    styleUrls: ['./address-list-page.component.scss']
})
export class AigAddressListPageComponent extends GenericComponent {
    constructor(
        private addressResourceService: AddressResourceService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
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

    filteredEopoo: Observable<EopooDTO[]>;
    filteredAddress: Observable<AddressDTO[]>;

    private initAddressSearch() {
        this.addressPaginationSize = 10;

        this.addressSearchFormGroup = this._formBuilder.group({
            id: [''],
            eopooTaxNumber: [''],
            address: [''],
        });

        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.addressSearchFormGroup.controls['eopooTaxNumber'].valueChanges);

        this.filteredAddress = this.genericAutocompleteFilterService.filterAddress(this.addressSearchFormGroup.controls['address'].valueChanges);

        this.addressDC = ["eopooId", "eopooTaxNumber", "id", "name", "address", "city", "buttons"];
    }

    private clearFiltersAddress() {
        this.addressFilters = {
            idEquals: null,
            eopooIdEquals: null,
            addressContains: null,
            page: 0,
        }
    }

    private async searchAddress(page: number) {
        this.addressDTOs = null;

        this.addressFilters.page = page;
        this.addressFilters.size = this.addressPaginationSize;

        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.addressSearchFormGroup.controls['eopooTaxNumber'].valueChanges);

        this.filteredAddress = this.genericAutocompleteFilterService.filterAddress(this.addressSearchFormGroup.controls['address'].valueChanges);

        try {
            this.addressLength = await this.addressResourceService.countAddressesUsingGET(this.addressFilters).toPromise();

            if (this.addressLength == 0) {
                this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
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

        if (searchedId != null) {
            this.clearFiltersAddress();
            this.addressSearchFormGroup.reset();
            this.addressFilters.idEquals = searchedId;
            this.searchAddress(0);
            return;
        }

        this.addressFilters.idEquals = null;

        if (this.addressSearchFormGroup.controls.eopooTaxNumber.value) {
            this.addressFilters.eopooIdEquals = this.addressSearchFormGroup.controls.eopooTaxNumber.value.id;
        }

        if (this.addressSearchFormGroup.controls.address.value) {
            this.addressFilters.addressContains = this.addressSearchFormGroup.controls.address.value;
        }

        this.searchAddress(0);
    }

    newAddress() {
        this.dialog.open(AigAddressNewUpdateModalComponent, { data: { } });
    }

    async publish() {
		await this.addressResourceService.publishUsingGET(this.addressFilters).toPromise;
	}
    //			---- !ADDRESS TABLE AND SEARCH SECTION ----
}