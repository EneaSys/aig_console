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


    filterCity(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
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
					expirationDateGreaterThanOrEqual: new Date()
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
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ilPpProcurementStatusResourceService.getAllIlPpProcurementStatusesUsingGET(filter);
			})
		);
	}


	filterIlPpProcurementLotAwardCriterion(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ilPpProcurementLotAwardCriterionResourceService.getAllIlPpProcurementLotAwardCriteriaUsingGET(filter);
			})
		);
	}
	filterIlPpProcurementLotStatus(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ilPpProcurementLotStatusResourceService.getAllIlPpProcurementLotStatusesUsingGET(filter);
			})
		);
	}
	filterIlPpPartecipationType(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ilPpPartecipationTypeResourceService.getAllIlPpPartecipationTypesUsingGET(filter);
			})
		);
	}






	

    filterIppLotType(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ippLotTypeResourceService.getAllIlPpProcurementLotTypesUsingGET(filter);
			})
		);
	}

    filterIppLotCategory(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ippLotCategoryResourceService.getAllIlPpProcurementLotCategoriesUsingGET(filter);
			})
		);
	}

    filterIppSector(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ippSectorResourceService.getAllIlPpProcurementSectorsUsingGET(filter);
			})
		);
	}

    filterIppModality(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ippModalityResourceService.getAllIlPpProcurementModalitiesUsingGET(filter);
			})
		);
	}

    filterIppProcedure(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThanOrEqual: new Date()
				};
                if (value && value.length > 0) {
					filter.nameContains = value;
				}
				return this.ippProcedureResourceService.getAllIlPpProcurementProceduresUsingGET(filter);
			})
		);
	}
	

}