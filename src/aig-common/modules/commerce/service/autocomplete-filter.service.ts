import { Injectable } from '@angular/core';
import { InventoryCategoryResourceService, InventoryItemResourceService, ProducerResourceService, WarehouseResourceService } from 'aig-commerce';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AigCommerceAutocompleteService {
   	constructor(
		private producerResourceService: ProducerResourceService,
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
        private warehouseResourceService: WarehouseResourceService,        
        private inventoryItemResourceService: InventoryItemResourceService,        
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

    filterWarehouse(observable: Observable<any>) {
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
  
}