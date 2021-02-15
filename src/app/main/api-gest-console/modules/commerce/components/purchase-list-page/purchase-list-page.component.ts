import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { InventoryItemDTO, PurchaseDTO, PurchaseResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemDialogComponent } from '../inventory-item-dialog/inventory-item-dialog.component';

@Component({
    selector: 'aig-purchase-list-page',
    templateUrl: './purchase-list-page.component.html',
    styleUrls: ['./purchase-list-page.component.scss']
})
export class AigPurchaseListPageComponent extends GenericComponent {
    constructor(
        private purchaseResourceService : PurchaseResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }





    loadPage() {
		this.initPurchaseSearch();

		this.showAllPurchase();
	}


	reloadPage() {
		this.showAllPurchase();
    }
    





    //			---- PURCHASE TABLE AND SEARCH SECTION ----

    purchaseSearchFormGroup: FormGroup;
    purchasePagination: any;
    purchaseFilters: any;

    purchaseLength: number;
    purchaseDTOs: PurchaseDTO[];
    purchaseError : any;

    purchaseDC : string[];

    private initPurchaseSearch() {
		this.purchasePagination = {
			size: 2,
			page: 0
		}
	
		this.purchaseSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.purchaseDC = ["amount","buyer","buyerId","id","insertedDateTime","seller","sellerId","statusNote"];
    }
    

    private initFiltersPurchase() {
		this.purchaseFilters = {
			id: null,
			name: null,
		}
    }
    
    private async searchPurchase(page: number) {
        this.purchasePagination.page = page;
        this.purchaseDTOs = null;
        try {
            this.purchaseLength = await this.purchaseResourceService.countPurchasesUsingGET().toPromise();
            this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET().toPromise();
        } catch (e) {
            this.purchaseError = e;
        }
    }

    showAllPurchase() {
		this.initFiltersPurchase();

    		this.searchPurchase(0);
	}


    clearFiltersPurchase() {
		this.purchaseSearchFormGroup.reset();
		this.showAllPurchase();
	}
    
    purchasePaginationEvent(pageEvent: PageEvent) {
        this.purchasePagination.size = pageEvent.pageSize;

		this.searchPurchase(pageEvent.pageIndex);
		
	}

    
    purchaseSearchWithFilter() {
		this.purchaseFilters.id = this.purchaseSearchFormGroup.controls.id.value;
		this.purchaseFilters.name = this.purchaseSearchFormGroup.controls.name.value;

		this.searchPurchase(0);
  }
  
  /*
   newPurchase(): void {
    this.dialog.open(AigInventoryItemDialogComponent, { data: { inventoryItem: {} } });
}
*/
}
