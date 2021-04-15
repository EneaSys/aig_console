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
}