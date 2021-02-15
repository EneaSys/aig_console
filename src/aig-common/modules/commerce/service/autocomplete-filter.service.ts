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
                    return this.producerResourceService.getAllProducersUsingGET(null,null,null,null,null,null,null,null,null,value);
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
                    return this.inventoryCategoryResourceService.getAllInventoryCategoriesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, value);
                } else {
                    return of([]);
                }
            })
        );
    }
  
}