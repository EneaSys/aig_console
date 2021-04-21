import { Injectable } from '@angular/core';
import { ProcurementLotResourceService, ProcurementResourceService } from 'aig-italianlegislation';
import { EopooResourceService } from 'aig-generic';
import { PartecipationResourceService } from 'aig-italianlegislation';
import { combineLatest, from, Observable, of } from 'rxjs';
import { combineAll, concatAll, map, mergeMap, startWith, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AigIppAutocompleteService {
	constructor(
        private procurementResourceService: ProcurementResourceService,
		private procurementLotResourceService: ProcurementLotResourceService,
		private eopooResourceService: EopooResourceService,
		private partecipationResourceService: PartecipationResourceService,
    ) {}

    filterProcurement(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						descriptionContains: value
					};
					return this.procurementResourceService.getAllProcurementsUsingGET(filter);
				} else {
					return this.procurementResourceService.getAllProcurementsUsingGET({});
				}
			})
		);
	}


	filterProcurementLot(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						descriptionContains: value
					};
					return this.procurementLotResourceService.getAllProcurementLotsUsingGET(filter);
				} else {
					return this.procurementLotResourceService.getAllProcurementLotsUsingGET({});
				}
			})
		);
	}


	filterPartecipation(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						partecipationdIdEquals: value
					};
					return this.partecipationResourceService.getAllPartecipationsUsingGET(filter);
				} else {
					return this.partecipationResourceService.getAllPartecipationsUsingGET({});
				}
			})
		);
	}
}