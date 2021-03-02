import { Injectable } from '@angular/core';
import { BuyerResourceService,  InventoryItemResourceService, InventoryCategoryResourceService, ProducerResourceService, PurchaseItemResourceService, PurchaseResourceService, InventoryItemCombinationResourceService, WarehouseHandlingItemResourceService, WarehouseHandlingResourceService } from 'aig-commerce';
import {  SellerResourceService, WarehouseResourceService } from 'aig-commerce';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AigCommerceAutocompleteService {
   	constructor(
		private producerResourceService: ProducerResourceService,
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
        private buyerResourceService: BuyerResourceService,              
        private warehouseResourceService: WarehouseResourceService,
        private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,
        private inventoryItemResourceService: InventoryItemResourceService,
        private sellerResourceService: SellerResourceService,  
        private purchaseResourceService: PurchaseResourceService,  
        private purchaseItemResourceService: PurchaseItemResourceService,       
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private warehouseHandlingResourceService: WarehouseHandlingResourceService,        
	) {}

	filterProducer(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 2) {
					let filter = {
						nameContains: value
					};
                    return this.producerResourceService.getAllProducersUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }        
    
    filterInventoryCategory(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
						nameContains: value
					};
                    return this.inventoryCategoryResourceService.getAllInventoryCategoriesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterBuyer(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
						eoopoCodeContains: value
					};
                    return this.buyerResourceService.getAllBuyersUsingGET(filter);
				} else {
                    return of([]);
                }
            })
        )
    }    
                    
    filterWarehouse(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 1) {
					let filter = {
						nameContains: value
					};
                    return this.warehouseResourceService.getAllWarehousesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterInventoryItem(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
                        nameContains: value
					};
                    return this.inventoryItemResourceService.getAllInventoryItemsUsingGET(filter);                } else {
                    return of([]);
                }
            })
        );
    }


    filterInventoryItemCombination(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
                        nameContains: value
					};
                    return this.inventoryItemCombinationResourceService.getAllInventoryItemCombinationsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterSeller(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
						nameContains: value
					};
                    return this.sellerResourceService.getAllSellersUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }
  
    warehouseCategory(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
						nameContains: value
					};
                    return this.warehouseResourceService.getAllWarehousesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterWarehouseHandlingItem(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: any) => {
                console.log("banana")
                if (value != null) {
					let filter = {
						dateEquals: value
					};
                    return this.warehouseHandlingItemResourceService.getAllWarehouseHandlingItemsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterPurchase(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
						nameContains: value
					};
                    return this.purchaseResourceService.getAllPurchasesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterPurchaseItem(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
						nameContains: value
					};
                    return this.purchaseItemResourceService.getAllPurchaseItemsUsingGET(filter);
                }
            })
        )
    }


    filterWarehouseHandling(observable: Observable<any>) {
        return observable.pipe(
            switchMap((value: any) => {
                if (value != null) {
					let filter = {
						dateEquals: value
					};
                    return this.warehouseHandlingResourceService.getAllWarehouseHandlingsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

}