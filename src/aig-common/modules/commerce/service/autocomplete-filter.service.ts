import { Injectable } from '@angular/core';
import { CatalogItemResourceService, CatalogResourceService, InventoryCategoryResourceService, InventoryItemResourceService, PriceListResourceService, SellerResourceService, WarehouseResourceService } from 'aig-commerce';
import { combineLatest, from, Observable, of } from 'rxjs';
import { combineAll, concatAll, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { BuyerResourceService, ProducerResourceService, PurchaseItemResourceService, PurchaseResourceService, InventoryItemCombinationResourceService, WarehouseHandlingItemResourceService, WarehouseHandlingResourceService } from 'aig-commerce';
import { EopooResourceService } from 'aig-generic';

@Injectable({
	providedIn: 'root'
})
export class AigCommerceAutocompleteFilterService {
	constructor(
		private producerResourceService: ProducerResourceService,
		private inventoryCategoryResourceService: InventoryCategoryResourceService,
		private inventoryItemResourceService: InventoryItemResourceService,
		private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
		private sellerResourceService: SellerResourceService,
		private catalogResourceService: CatalogResourceService,
		private catalogItemResourceService: CatalogItemResourceService,
		private warehouseResourceService: WarehouseResourceService,
		private priceListResourceService: PriceListResourceService,
        private buyerResourceService: BuyerResourceService,              
        private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,  
        private purchaseResourceService: PurchaseResourceService,  
        private purchaseItemResourceService: PurchaseItemResourceService,       
        private warehouseHandlingResourceService: WarehouseHandlingResourceService,
		private eopooResourceService: EopooResourceService,    
	) {}

	filterProducer(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						producerNameContains: value
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
				if (value && value.length > 0) {
					let filter = {
						inventoryCategoryNameContains: value
					};
					return this.inventoryCategoryResourceService.getAllInventoryCategoriesUsingGET(filter);
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
				if (value && value.length > 1) {
					let filter = {
						inventoryItemNameContains: value
					};
					return this.inventoryItemResourceService.getAllInventoryItemsUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

	filterInventoryItemCombination(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						inventoryItemCombinationNameContains: value
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
				if (value && value.length > 0) {
					let filter = {
						sellerNameContains: value
					};
					return this.sellerResourceService.getAllSellersUsingGET(filter);
				} else {
					return ([]);
				}
			})
		);
	}

	filterCatalog(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						catalogNameContains: value
					};
					return this.catalogResourceService.getAllCatalogsUsingGET(filter);
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
                if (value && value.length > 1) {
					let filter = {
						buyerIdEquals: value
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
						warehouseNameContains: value
					};
					return this.warehouseResourceService.getAllWarehousesUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

	filterCatalogItem(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						activeEquals: null
					};
					return this.catalogItemResourceService.getAllCatalogItemsUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

	filterCatalogItemByCatalog(catalogId: number, catalogItemObservable: Observable<any>) {
		return catalogItemObservable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						activeEquals: null,
						catalogIdEquals: catalogId
					};
					return this.catalogItemResourceService.getAllCatalogItemsUsingGET(filter);
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
				if (value && value.length > 1) {
					let filter = {
						warehouseNameContains: value
					};
					return this.warehouseResourceService.getAllWarehousesUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

	filterPriceList(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						priceListNameContains: value
					};
					return this.priceListResourceService.getAllPriceListsUsingGET(filter);
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
                if (value && value != null) {
					let filter = {
						warehouseHandlingItemDateEquals: value
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
                if (value && value.length > 1) {
					let filter = {
						purchaseNameContains: value
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
                if (value && value.length > 1) {
					let filter = {
						purchaseItemNameContains: value
					};
                    return this.purchaseItemResourceService.getAllPurchaseItemsUsingGET(filter);
                }
            })
        )
    }

	filterEopoo(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 1) {
					let filter = {
						eopooNameContains: value
					};
                    return this.eopooResourceService.getAllEopoosUsingGET(filter);
                }
            })
        )
    }


    filterWarehouseHandling(observable: Observable<any>) {
        return observable.pipe(
            switchMap((value: any) => {
                if (value && value != null) {
					let filter = {
						warehouseHandlingDateEquals: value
					};
                    return this.warehouseHandlingResourceService.getAllWarehouseHandlingsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

}