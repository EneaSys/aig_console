import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CityResourceService } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteFilterService {

    constructor(
        private cityResourceService: CityResourceService,
    ) {}

    filterCity(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.cityResourceService.getAllCitiesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, value, null, null, null, null, null, null, 10, null, null, null, null, null, null, null);
                } else {
                    return of([]);
                }
            })
        );
    }
}