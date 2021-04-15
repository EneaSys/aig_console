import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CityResourceService, ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementSectorResourceService } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteFilterService {

    constructor(
        private cityResourceService: CityResourceService,
        private ippProcedureResourceService: ItalianPublicProcurementProcedureResourceService,
        private ippSectorResourceService: ItalianPublicProcurementSectorResourceService,
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
    ) {}

    filterCity(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.cityResourceService.getAllCitiesUsingGET();
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
                if (value.length > 2) {
                    let filter = {
                        nameContains: value
                    }
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
                if (value.length > 2) {
                    let filter = {
                        nameContains: value
                    }
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
                if (value.length > 2) {
                    let filter = {
                        nameContains: value
                    }
                    return this.ippModalityResourceService.getAllItalianPublicProcurementModalitiesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }
}