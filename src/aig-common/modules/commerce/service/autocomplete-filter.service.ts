import { Injectable } from '@angular/core';
import { InventoryCategoryResourceService, ProducerResourceService } from 'aig-commerce';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AigCommerceAutocompleteService {
	constructor(
		private producerResourceService: ProducerResourceService,
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
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
}