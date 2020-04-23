import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { EopooResourceService, EopooDTO } from 'aig-generic';

@Injectable()
export class AigGenericAutocompleteFilterService {
    constructor(
        private eopooResourceService: EopooResourceService,
    ) { }

    filterEopoo(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length == 1) {
                    return this.eopooResourceService.getAllEopoosUsingGET(3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,50,null,null,null,null,null,null,null);
                } else {
                    return of([]);
                }
            })
        );
    }
}