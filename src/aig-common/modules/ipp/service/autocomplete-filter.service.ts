import { Injectable } from '@angular/core';
import { InsurancePolicyStatusResourceService, PartecipationStatusResourceService, PreparationStatusResourceService, ProcurementLotResourceService, ProcurementResourceService } from 'aig-italianlegislation';
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
		private partecipationStatusResourceService: PartecipationStatusResourceService, 
		private partecipationResourceService: PartecipationResourceService,
		private preparationStatusResourceService: PreparationStatusResourceService,
		private insurancePolicyStatusResourceService: InsurancePolicyStatusResourceService,
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

	filterPartecipationStatus(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						descriptionContains: value
					};
					return this.partecipationStatusResourceService.getAllPartecipationStatusesUsingGET(filter);
				} else {
					return this.partecipationStatusResourceService.getAllPartecipationStatusesUsingGET({});
				}
			})
		);
	}

	filterPreparationStatus(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						descriptionContains: value
					};
					return this.preparationStatusResourceService.getAllPreparationStatusesUsingGET(filter);
				} else {
					return this.preparationStatusResourceService.getAllPreparationStatusesUsingGET({});
				}
			})
		);
	}

	filterInsurancePolicyStatus(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						descriptionContains: value
					};
					return this.insurancePolicyStatusResourceService.getAllInsurancePolicyStatusesUsingGET(filter);
				} else {
					return this.insurancePolicyStatusResourceService.getAllInsurancePolicyStatusesUsingGET({});
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