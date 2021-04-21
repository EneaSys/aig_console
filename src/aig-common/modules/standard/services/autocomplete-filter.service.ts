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
                if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.cityResourceService.getAllCitiesUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

    filterIppLotType(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.ippLotTypeResourceService.getAllItalianPublicProcurementLotTypesUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

    filterIppLotCategory(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.ippProcedureResourceService.getAllItalianPublicProcurementProceduresUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

    filterIppSector(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.ippSectorResourceService.getAllItalianPublicProcurementSectorsUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

    filterIppModality(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.ippModalityResourceService.getAllItalianPublicProcurementModalitiesUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}

    filterIppProcedure(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.ippLotCategoryResourceService.getAllItalianPublicProcurementLotCategoriesUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}
	filterCpv(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.cpvResourceService.getAllCpvsUsingGET(filter);
				} else {
					return of([]);
				}
			})
		);
	}
}