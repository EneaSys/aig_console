import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AddressResourceService, EopooResourceService, EopooTypeResourceService } from 'aig-generic';

@Injectable()
export class AigGenericAutocompleteFilterService {
    constructor(
        private eopooResourceService: EopooResourceService,
        private eopooTypeResourceService: EopooTypeResourceService,
		private addressResourceService: AddressResourceService,
    ) { }

    filterEopoo(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
<<<<<<< HEAD
                if (value.length == 1) {
                    return this.eopooResourceService.getAllEopoosUsingGET({});
                } else {
                    return of([]);
                }
            })
        );
    }
=======
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

	filterAddress(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						addressContains: value
					};
					return this.addressResourceService.getAllAddressesUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}
>>>>>>> develop
}