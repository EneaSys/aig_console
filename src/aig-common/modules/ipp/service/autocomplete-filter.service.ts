import { Injectable } from '@angular/core';
import { ProcurementResourceService } from 'aig-italianlegislation';
import { combineLatest, from, Observable, of } from 'rxjs';
import { combineAll, concatAll, map, mergeMap, startWith, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AigIppAutocompleteService {
	constructor(
        private procurementResourceService: ProcurementResourceService,
    ) {}

    filterProcurement(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 2) {
					let filter = {
						procurementIdEquals: value
					};
					return this.procurementResourceService.getAllProcurementsUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}
}