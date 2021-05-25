import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { PurchaseDTO, PurchaseResourceService, SellerDTO, SellerResourceService } from 'aig-commerce';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigCommerceGenericComponent } from '../commerce-generic-component';
import { AigPurchaseComplexDialogComponent } from '../purchase-complex-dialog/purchase-complex-dialog.component';
import { AigPurchaseNewUpdateDialogComponent } from '../purchase-new-update-dialog/purchase-new-update-dialog.component';

@Component({
    selector: 'aig-purchase-list-page',
    templateUrl: './purchase-list-page.component.html',
    styleUrls: ['./purchase-list-page.component.scss']
})
export class AigPurchaseListPageComponent extends AigCommerceGenericComponent {
    constructor(
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
        private purchaseResourceService: PurchaseResourceService,
        private sellerResourceService: SellerResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    @Input()
    staticSeller: SellerDTO = null;

    sellerDTO: SellerDTO;

    loadPage() {
        this.initPurchaseSearch();

        this.sellerDTO = this.staticSeller;

        this.showAllPurchase();
    }

    async reloadPage() {
        this.showAllPurchase();

        this.sellerDTO = await this.sellerResourceService.getSellerUsingGET(this.staticSeller.id).toPromise();
    }

    //			---- PURCHASE TABLE AND SEARCH SECTION ----

    purchaseDTOs: PurchaseDTO[];
    purchaseDC: string[];
    purchaseError: any;

    purchaseSearchFormGroup: FormGroup;
    purchaseFilters: any;

    purchasePaginationSize: number;
    purchaseLength: number;

    filteredEopoo: Observable<EopooDTO[]>;

    private initPurchaseSearch() {
        this.purchasePaginationSize = 10;

        this.purchaseSearchFormGroup = this._formBuilder.group({
            id: [''],
            eopoo: [''],
            insertedDateTime: [''],
            amount: [''],
            statusNote: [''],
            closed: [''],
            notClosed: [''],
        });

        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.purchaseSearchFormGroup.controls['eopoo'].valueChanges);

        this.purchaseDC = ["id", "buyer", "insertedDataTime", "amount", "statusNote", "closed", "buttons"];
    }

    private clearFiltersPurchase() {
        this.purchaseFilters = {
            idEquals: null,
            sellerIDEquals: this.staticSeller ? this.staticSeller.id : null,
            purchaseInsertedDateTimeEquals: null,
            purchaseStatusNoteContains: null,
            buyerGenericIDEquals: null,
            buyerPersonIDEquals: null,
            purchaseClosedNotEquals: null,
            purchaseClosedEquals: null,
            page: 0,
        }
    }

    private async searchPurchase(page: number) {
        this.purchaseDTOs = null;

        this.purchaseFilters.page = page;
        this.purchaseFilters.size = this.purchasePaginationSize;

        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.purchaseSearchFormGroup.controls['eopoo'].valueChanges);

        try {
            this.purchaseLength = await this.purchaseResourceService.countPurchasesUsingGET(this.purchaseFilters).toPromise();

            if (this.purchaseLength == 0) {
                this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
                this.purchaseDTOs = [];
                return;
            }

            this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(this.purchaseFilters).toPromise();
        } catch (e) {
            this.purchaseError = e;
        }
        console.log(this.purchaseDTOs)
    }

    showAllPurchase() {
        this.resetFiltersPurchase();
    }

    resetFiltersPurchase() {
        this.purchaseSearchFormGroup.reset();
        this.clearFiltersPurchase();
        this.searchPurchase(0);
    }

    purchasePaginationEvent(pageEvent: PageEvent) {
        this.purchasePaginationSize = pageEvent.pageSize;
        this.searchPurchase(pageEvent.pageIndex);
    }

    purchaseSearchWithFilter() {
        let searchedId = this.purchaseSearchFormGroup.controls.id.value;

        if (searchedId != null) {
            this.clearFiltersPurchase();
            this.purchaseSearchFormGroup.reset();
            this.purchaseFilters.purchaseIDEquals = searchedId;
            this.searchPurchase(0);
            return;
        } 
        
        this.purchaseFilters.purchaseIDEquals = null;

        this.purchaseFilters.purchaseInsertedDateTimeEquals = this.purchaseSearchFormGroup.controls.insertedDateTime.value;

        this.purchaseFilters.purchaseStatusNoteContains = this.purchaseSearchFormGroup.controls.statusNote.value;

        if (this.purchaseSearchFormGroup.controls.eopoo.value) {
			this.purchaseFilters.buyerGenericIDEquals = this.purchaseSearchFormGroup.controls.eopoo.value.genericEopoo ? this.purchaseSearchFormGroup.controls.eopoo.value.genericEopoo.id : null;
			this.purchaseFilters.buyerPersonIDEquals = this.purchaseSearchFormGroup.controls.eopoo.value.person ? this.purchaseSearchFormGroup.controls.eopoo.value.person.id : null;
		}

        if (this.purchaseSearchFormGroup.controls.notClosed.value) {
			this.purchaseFilters.purchaseClosedNotEquals = this.purchaseSearchFormGroup.controls.notClosed.value;
            this.purchaseFilters.purchaseClosedEquals = null
		}

        if (this.purchaseSearchFormGroup.controls.closed.value) {
			this.purchaseFilters.purchaseClosedEquals = this.purchaseSearchFormGroup.controls.closed.value;
            this.purchaseFilters.purchaseClosedNotEquals = null
		}

        if (this.purchaseSearchFormGroup.controls.notClosed.value && this.purchaseSearchFormGroup.controls.closed.value) {
			this.purchaseFilters.purchaseClosedEquals = null;
            this.purchaseFilters.purchaseClosedNotEquals = null
		}

            this.searchPurchase(0);
        }

        //			---- !PURCHASE TABLE AND SEARCH SECTION ----

        newPurchase(): void {
            this.dialog.open(AigPurchaseNewUpdateDialogComponent, { data: {} });
        }
    
        newPurchaseComplex(): void {
            this.dialog.open(AigPurchaseComplexDialogComponent, { data: {} });
        }
    
    }