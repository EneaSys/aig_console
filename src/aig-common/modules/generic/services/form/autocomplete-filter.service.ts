import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AddressResourceService, EopooResourceService, EopooTypeResourceService, ReferentResourceService } from 'aig-generic';

@Injectable()
export class AigGenericAutocompleteFilterService {
    constructor(
        private eopooResourceService: EopooResourceService,
        private eopooTypeResourceService: EopooTypeResourceService,
		private addressResourceService: AddressResourceService,
		private referentResourceService: ReferentResourceService,
    ) { }

    filterEopoo(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						eopooCompleteNameContains: value
					};
					return this.eopooResourceService.getAllEopoosUsingGET(filter);
				} else {
					return this.eopooResourceService.getAllEopoosUsingGET({});
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
					return this.eopooTypeResourceService.getAllEopooTypesUsingGET({});
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
					return this.addressResourceService.getAllAddressesUsingGET({});
				}
			})
		);
	}

	filterReferent(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						firstnameContains: value
					};
					return this.referentResourceService.getAllReferentsUsingGET(filter);
				} else {
					return this.referentResourceService.getAllReferentsUsingGET({});
				}
			})
		);
	}
}