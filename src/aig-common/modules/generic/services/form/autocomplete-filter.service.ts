import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { EopooResourceService, EopooTypeResourceService } from 'aig-generic';

@Injectable()
export class AigGenericAutocompleteFilterService {
    constructor(
        private eopooResourceService: EopooResourceService,
        private eopooTypeResourceService: EopooTypeResourceService,
    ) { }

    filterEopoo(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						taxNumberContains: value
					};
					return this.eopooResourceService.getAllEopoosUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

    filterEopooType(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.eopooTypeResourceService.getAllEopooTypesUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}
}