import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { PurchaseDTO, PurchaseResourceService } from 'aig-commerce';
import { AigPurchaseNewUpdateFormComponent } from 'aig-common/modules/commerce/components/purchase-new-update-form/purchase-new-update-form.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPurchaseNewUpdateDialogComponent } from '../purchase-new-update-dialog/purchase-new-update-dialog.component';

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
    private _snackBar: MatSnackBar,
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
  purchasePaginationSize: number;
  purchaseFilters: any;

  purchaseLength: number;
  purchaseDTOs: PurchaseDTO[];
  purchaseError : any;

  purchaseDC : string[];

  private initPurchaseSearch() {
    this.purchasePaginationSize = 10
	  this.purchaseSearchFormGroup = this._formBuilder.group({
			id: [''],
			insertedDateTime: [''],
		});

    this.purchaseDC = ["id","amount","buyer","closed","insertedDataTime","statusNote","buttons"];
  }
    
  private clearFiltersPurchase() {
    this.purchaseFilters = {
      idEquals: null,
      insertedDateTimeEquals : null,
      page: 0,
    }
  }
    
  private async searchPurchase(page: number) {
    this.purchaseFilters.page = page;
    this.purchaseDTOs = null;
    this.purchaseFilters.size = this.purchasePaginationSize;
    try {
      this.purchaseLength = await this.purchaseResourceService.countPurchasesUsingGET(this.purchaseFilters).toPromise();
      if(this.purchaseLength == 0) {
        this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
        this.purchaseDTOs = [];
        return;
      }
      this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(this.purchaseFilters).toPromise();
    } catch (e) {
        this.purchaseError = e;
      }
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
    if(searchedId != null) {
      this.clearFiltersPurchase();
      this.purchaseSearchFormGroup.reset();
      this.purchaseFilters.idEquals= searchedId;
      this.searchPurchase(0);
      return;
    }
        
    this.purchaseFilters.idEquals = null;
    this.purchaseFilters.insertedDateTime = this.purchaseSearchFormGroup.controls.insertedDateTime.value.date;

    this.searchPurchase(0);
  }
  
  
  
   newPurchase(): void {
    this.dialog.open(AigPurchaseNewUpdateDialogComponent, { data: { purchase: {} } });
  }
  
}
