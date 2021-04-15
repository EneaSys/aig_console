import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CityResourceService, ItalianPublicProcurementModalityResourceService } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteFilterService {

    constructor(
        private cityResourceService: CityResourceService,
        private italianPublicProcurementModalityResourceService: ItalianPublicProcurementModalityResourceService,
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

    filterItalianPublicProcurementModality(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                console.log(value);
                if (value.length > 4) {
                    return this.italianPublicProcurementModalityResourceService.getAllItalianPublicProcurementModalitiesUsingGET({});
                } else {
                    return of([]);
                }
            })
        );
    }
}