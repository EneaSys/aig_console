import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { BuyerDTO, PurchaseDTO, PurchaseResourceService, SellerDTO } from 'aig-commerce';
import { AigPurchaseNewUpdateFormComponent } from 'aig-common/modules/commerce/components/purchase-new-update-form/purchase-new-update-form.component';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigPurchaseNewUpdateDialogComponent } from '../purchase-new-update-dialog/purchase-new-update-dialog.component';

@Component({
    selector: 'aig-purchase-list-page',
    templateUrl: './purchase-list-page.component.html',
    styleUrls: ['./purchase-list-page.component.scss']
})
export class AigPurchaseListPageComponent extends GenericComponent {
  constructor(
    public autocompleteDisplayService: AigAutocompleteDisplayService,
    private purchaseResourceService : PurchaseResourceService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private commerceAutocompleteService: AigCommerceAutocompleteService,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  filteredSeller: Observable<SellerDTO[]>;
  

  closed: boolean;

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
      statusNote: [''],
      seller: [''],
      amount: [''],
      buyer: [''],

     
		});

    

    this.purchaseDC = ["id","amount","buyer","closed","insertedDataTime","statusNote","seller","buttons"];
  }
    
  private clearFiltersPurchase() {
    this.purchaseFilters = {
      idEquals: null,
      insertedDateTimeEquals : null,
      statusNoteContains : null,
      sellerIdEquals: null,
      buyerIdEquals: null,
      page: 0,
    }
  }
    
  private async searchPurchase(page: number) {
    this.purchaseFilters.page = page;
    this.purchaseDTOs = null;
    this.purchaseFilters.size = this.purchasePaginationSize;
    this.filteredSeller = this.commerceAutocompleteService.filterSeller(this.purchaseSearchFormGroup.controls['seller'].valueChanges);
   
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
    } else {

      
			if(this.purchaseSearchFormGroup.controls.insertedDateTime.value){
				this.purchaseFilters.insertedDateTimeEquals = this.purchaseSearchFormGroup.controls.insertedDateTime.value.date;
      }

      if(this.purchaseSearchFormGroup.controls.statusNote.value){
        this.purchaseFilters.statusNoteContains = this.purchaseSearchFormGroup.controls.statusNote.value;
      }
      
      if(this.purchaseSearchFormGroup.controls.seller.value){
        this.purchaseFilters.sellerIdEquals = this.purchaseSearchFormGroup.controls.seller.value.id;
      }

      if(this.purchaseSearchFormGroup.controls.buyer.value){
        this.purchaseFilters.buyerIdEquals = this.purchaseSearchFormGroup.controls.buyer.value;
      }

      this.searchPurchase(0);
    }
  }
  
  
  
   newPurchase(): void {
    this.dialog.open(AigPurchaseNewUpdateDialogComponent, { data: { purchase: {} } });
  }
  
}
