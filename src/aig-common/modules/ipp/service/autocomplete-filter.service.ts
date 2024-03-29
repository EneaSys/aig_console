import { Injectable } from '@angular/core';
import { InsurancePolicyStatusResourceService, PartecipationModalityResourceService, PartecipationStatusResourceService, PreparationModalityResourceService, PreparationResourceService, PreparationStatusResourceService, ProcurementLotResourceService, ProcurementResourceService } from 'aig-italianlegislation';
import { EopooResourceService } from 'aig-generic';
import { PartecipationResourceService } from 'aig-italianlegislation';
import { combineLatest, from, Observable, of } from 'rxjs';
import { combineAll, concatAll, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { IlPpProcurementLotCategoryResourceService } from 'aig-standard';

@Injectable({
	providedIn: 'root'
})
export class AigIppAutocompleteService {
	constructor(
        private procurementResourceService: ProcurementResourceService,
		private procurementLotResourceService: ProcurementLotResourceService,
		private partecipationModalityResourceService: PartecipationModalityResourceService, 
		private partecipationStatusResourceService: PartecipationStatusResourceService, 
		private partecipationResourceService: PartecipationResourceService,
		private preparationStatusResourceService: PreparationStatusResourceService,
		private preparationModalityResourceService: PreparationModalityResourceService,
		private preparationResourceService: PreparationResourceService,
		private insurancePolicyStatusResourceService: InsurancePolicyStatusResourceService,
		
    ) {}

    filterProcurement(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						procurementDescriptionContains: value
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

	filterPartecipationModality(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						descriptionContains: value
					};
					return this.partecipationModalityResourceService.getAllPartecipationModalitiesUsingGET(filter);
				} else {
					return this.partecipationModalityResourceService.getAllPartecipationModalitiesUsingGET({});
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
	filterPreparationModality(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				let filter: any = { };
				if (value && value.length > 0) {
					filter.descriptionContains = value;
				}
				return this.preparationModalityResourceService.getAllPreparationModalitiesUsingGET(filter);
			})
		);
	}

	filterPreparation(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						descriptionContains: value
					};
					return this.preparationResourceService.getAllPreparationsUsingGET(filter);
				} else {
					return this.preparationResourceService.getAllPreparationsUsingGET({});
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