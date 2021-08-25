import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CityResourceService, CpvResourceService, IlPpPartecipationTypeResourceService, IlPpProcurementLotAwardCriterionResourceService, IlPpProcurementLotCategoryResourceService, IlPpProcurementLotStatusResourceService, IlPpProcurementLotTypeResourceService, IlPpProcurementModalityResourceService, IlPpProcurementProcedureResourceService, IlPpProcurementSectorResourceService, IlPpProcurementStatusResourceService } from 'aig-standard';
import * as moment from 'moment';

@Injectable()
export class AigStandardAutocompleteFilterService {

    constructor(
        private cityResourceService: CityResourceService,
        
		private cpvResourceService: CpvResourceService,
		
		
		private ilPpProcurementStatusResourceService: IlPpProcurementStatusResourceService,
		private ilPpProcurementLotAwardCriterionResourceService: IlPpProcurementLotAwardCriterionResourceService,
		private ilPpProcurementLotStatusResourceService: IlPpProcurementLotStatusResourceService,
		private ilPpPartecipationTypeResourceService: IlPpPartecipationTypeResourceService,

        
		
		private ippProcedureResourceService: IlPpProcurementProcedureResourceService,
        private ippSectorResourceService: IlPpProcurementSectorResourceService,
        private ippModalityResourceService: IlPpProcurementModalityResourceService,
        private ippLotTypeResourceService: IlPpProcurementLotTypeResourceService,
        private ippLotCategoryResourceService: IlPpProcurementLotCategoryResourceService,
    ) {}

	DATE_TIME_FORMAT = 'YYYY-MM-DD'; 

    filterCity(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						//expirationDateGreaterThanOrEqual: now
					};
				}
				return this.cityResourceService.getAllCitiesUsingGET(filter);
			})
		);
	}










	filterCpv(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: moment().format(this.DATE_TIME_FORMAT)
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.cpvResourceService.getAllCpvsUsingGET(filter);
			})
		);
	}










	filterIlPpProcurementStatus(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ilPpProcurementStatusResourceService.getAllIlPpProcurementStatusesUsingGET(filter);
			})
		);
	}


	filterIlPpProcurementLotAwardCriterion(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ilPpProcurementLotAwardCriterionResourceService.getAllIlPpProcurementLotAwardCriteriaUsingGET(filter);
			})
		);
	}
	filterIlPpProcurementLotStatus(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ilPpProcurementLotStatusResourceService.getAllIlPpProcurementLotStatusesUsingGET(filter);
			})
		);
	}
	filterIlPpPartecipationType(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ilPpPartecipationTypeResourceService.getAllIlPpPartecipationTypesUsingGET(filter);
			})
		);
	}






	

    filterIppLotType(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ippLotTypeResourceService.getAllIlPpProcurementLotTypesUsingGET(filter);
			})
		);
	}

    filterIppLotCategory(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ippLotCategoryResourceService.getAllIlPpProcurementLotCategoriesUsingGET(filter);
			})
		);
	}

    filterIppSector(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ippSectorResourceService.getAllIlPpProcurementSectorsUsingGET(filter);
			})
		);
	}

    filterIppModality(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ippModalityResourceService.getAllIlPpProcurementModalitiesUsingGET(filter);
			})
		);
	}

    filterIppProcedure(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
				let now = moment(new Date(), this.DATE_TIME_FORMAT);
                if (value && value.length > 0) {
					filter = {
						nameContains: value,
						expirationDateGreaterThanOrEqual: now
					};
				}
				return this.ippProcedureResourceService.getAllIlPpProcurementProceduresUsingGET(filter);
			})
		);
	}
	

}