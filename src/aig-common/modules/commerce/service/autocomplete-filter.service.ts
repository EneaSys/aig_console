import { Injectable } from '@angular/core';
import { CatalogItemResourceService, CatalogResourceService, InventoryCategoryResourceService, InventoryItemCombinationResourceService, InventoryItemResourceService, PriceListResourceService, ProducerResourceService, SellerResourceService, WarehouseResourceService } from 'aig-commerce';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AigCommerceAutocompleteService {
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

    filterInventoryItem(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
						nameContains: value
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

    filterCatalog(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
					let filter = {
						nameContains: value
					};
                    return this.catalogResourceService.getAllCatalogsUsingGET(filter);
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
                if (value.length > 0) {
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

    filterPriceList(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 0) {
                    let filter = {
						catalogIdEquals: null
					};
                    return this.priceListResourceService.getAllPriceListsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

}