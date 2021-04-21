import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CityResourceService, CpvResourceService, ItalianPublicProcurementLotCategoryResourceService, ItalianPublicProcurementLotTypeResourceService, ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementSectorResourceService } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteFilterService {

    constructor(
        private cityResourceService: CityResourceService,
        private ippProcedureResourceService: ItalianPublicProcurementProcedureResourceService,
        private ippSectorResourceService: ItalianPublicProcurementSectorResourceService,
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
        private ippLotTypeResourceService: ItalianPublicProcurementLotTypeResourceService,
        private ippLotCategoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
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
				return this.ippLotTypeResourceService.getAllItalianPublicProcurementLotTypesUsingGET(filter);
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
				return this.ippLotCategoryResourceService.getAllItalianPublicProcurementLotCategoriesUsingGET(filter);
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
				return this.ippSectorResourceService.getAllItalianPublicProcurementSectorsUsingGET(filter);
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
				return this.ippModalityResourceService.getAllItalianPublicProcurementModalitiesUsingGET(filter);
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
				return this.ippProcedureResourceService.getAllItalianPublicProcurementProceduresUsingGET(filter);
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