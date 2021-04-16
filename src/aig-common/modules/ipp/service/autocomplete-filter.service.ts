import { Injectable } from '@angular/core';
import { EopooResourceService } from 'aig-generic';
import { PartecipationResourceService, ProcurementResourceService } from 'aig-italianlegislation';
import { combineLatest, from, Observable, of } from 'rxjs';
import { combineAll, concatAll, map, mergeMap, startWith, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AigIppAutocompleteService {
	constructor(
        private procurementResourceService: ProcurementResourceService,
		private eopooResourceService: EopooResourceService,
		private partecipationResourceService: PartecipationResourceService,
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

	filterEopoo(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 2) {
					let filter = {
						eopooIdEquals: value
					};
					return this.eopooResourceService.getAllEopoosUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

	filterPartecipation(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 2) {
					let filter = {
						partecipationdIdEquals: value
					};
					return this.partecipationResourceService.getAllPartecipationsUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}
}