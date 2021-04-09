import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService, InventoryItemDTO, InventoryItemResourceService, PurchaseItemDTO, PurchaseItemResourceService } from 'aig-commerce';
import { AigPurchaseItemListTableComponent } from 'aig-common/modules/commerce/components/purchase-item-list-table/purchase-item-list-table.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPurchaseItemNewUpdateDialogComponent } from '../purchase-item-new-update-dialog/purchase-item-new-update-dialog.component';

@Component({
    selector: 'aig-purchase-item-list-page',
    templateUrl: './purchase-item-list-page.component.html',
    styleUrls: ['./purchase-item-list-page.component.scss']
})
export class AigPurchaseItemListPageComponent extends GenericComponent {
  constructor(
    private purchaseItemResourceService : PurchaseItemResourceService,
    private inventoryItemResourceService: InventoryItemResourceService,
    private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }





  loadPage() {
		this.initPurchaseItemSearch();

		this.showAllPurchaseItem();
	}


	reloadPage() {
		this.showAllPurchaseItem();
  }
    





  //			---- PURCHASE ITEM TABLE AND SEARCH SECTION ----

  purchaseItemSearchFormGroup: FormGroup;
  purchaseItemPaginationSize: number;
  purchaseItemFilters: any;

  purchaseItemLength: number;
  purchaseItemDTOs: PurchaseItemDTO[];
  purchaseItemError : any;

  purchaseItemDC : string[];

  inventoryItemCombinationDTOs : InventoryItemCombinationDTO;
  inventoryItem : InventoryItemDTO;

  private initPurchaseItemSearch() {
	  this.purchaseItemPaginationSize = 10
	
	  this.purchaseItemSearchFormGroup = this._formBuilder.group({
		  id: [''],
		  price: [''],
	  });

	  this.purchaseItemDC = ["id","inventoryItemCombination","price","purchase","quantity","tax","warehouseHandlingItem","buttons"];
  }
    

  private clearFiltersPurchaseItem() {
		this.purchaseItemFilters = {
			purchaseItemIdEquals: null,
			priceEquals: null,
			page: 0,
		}
  }
    
  private async searchPurchaseItem(page: number) {
    this.purchaseItemDTOs = null;
    this.purchaseItemFilters.page = page;
    this.purchaseItemFilters.size = this.purchaseItemPaginationSize;
    try {
      this.purchaseItemLength = await this.purchaseItemResourceService.countPurchaseItemsUsingGET(this.purchaseItemFilters).toPromise();
        if(this.purchaseItemLength == 0) {
          this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
          this.purchaseItemDTOs = [];
            return;
        }
        this.purchaseItemDTOs = await this.purchaseItemResourceService.getAllPurchaseItemsUsingGET(this.purchaseItemFilters).toPromise();
      } catch (e) {
          this.purchaseItemError = e;
        }
  }

  showAllPurchaseItem() {
	  this.resetFiltersPurchaseItem();
	}


  resetFiltersPurchaseItem() {
		this.purchaseItemSearchFormGroup.reset();
		this.clearFiltersPurchaseItem();
		this.searchPurchaseItem(0);
	}
    
    purchaseItemPaginationEvent(pageEvent: PageEvent) {
    this.purchaseItemPaginationSize = pageEvent.pageSize;
    this.searchPurchaseItem(pageEvent.pageIndex);
	}

    
    purchaseItemSearchWithFilter() {
    let searchedId = this.purchaseItemSearchFormGroup.controls.id.value;

    if(searchedId != null) {
      this.clearFiltersPurchaseItem();
      this.purchaseItemSearchFormGroup.reset();
      this.purchaseItemFilters.purchaseItemIdEquals= searchedId;
      this.searchPurchaseItem(0);
      return;
    }
      
		this.purchaseItemFilters.purchaseItemIdEquals = null;
		this.purchaseItemFilters.priceEquals = this.purchaseItemSearchFormGroup.controls.price.value;

		this.searchPurchaseItem(0);
  }
  
  
  newPurchaseItem(): void {
    this.dialog.open(AigPurchaseItemNewUpdateDialogComponent, { data: { purchaseItem: {} } });
  }
  
}
