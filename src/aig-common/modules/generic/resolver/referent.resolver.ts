import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReferentDTO, ReferentResourceService } from 'aig-generic';

@Injectable()
export class ReferentResolver implements Resolve<Observable<ReferentDTO>> {
    constructor(private referentResourceService: ReferentResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.referentResourceService.getReferentUsingGET(id);
    }
}