import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CityResourceService, CpvResourceService, IlPpProcurementLotCategoryResourceService, IlPpProcurementLotTypeResourceService, IlPpProcurementModalityResourceService, IlPpProcurementProcedureResourceService, IlPpProcurementSectorResourceService } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteFilterService {

    constructor(
        private cityResourceService: CityResourceService,
        private ippProcedureResourceService: IlPpProcurementProcedureResourceService,
        private ippSectorResourceService: IlPpProcurementSectorResourceService,
        private ippModalityResourceService: IlPpProcurementModalityResourceService,
        private ippLotTypeResourceService: IlPpProcurementLotTypeResourceService,
        private ippLotCategoryResourceService: IlPpProcurementLotCategoryResourceService,
        private cpvResourceService: CpvResourceService,
    ) {}

    filterCity(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
                if (value && value.length > 0) {
					filter = {
						nameContains: value
					};
				}
				return this.cityResourceService.getAllCitiesUsingGET(filter);
			})
		);
	}

    filterIppLotType(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
                if (value && value.length > 0) {
					filter = {
						nameContains: value
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
                if (value && value.length > 0) {
					filter = {
						nameContains: value
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
                if (value && value.length > 0) {
					filter = {
						nameContains: value
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
                if (value && value.length > 0) {
					filter = {
						nameContains: value
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
                if (value && value.length > 0) {
					filter = {
						nameContains: value
					};
				}
				return this.ippProcedureResourceService.getAllIlPpProcurementProceduresUsingGET(filter);
			})
		);
	}
	filterCpv(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter = {};
                if (value && value.length > 0) {
					filter = {
						nameContains: value
					};
				}
				return this.cpvResourceService.getAllCpvsUsingGET(filter);
			})
		);
	}
}