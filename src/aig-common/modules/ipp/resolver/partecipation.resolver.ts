import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PartecipationDTO,PartecipationResourceService } from 'aig-italianlegislation';

@Injectable()
export class PartecipationResolver implements Resolve<Observable<PartecipationDTO>> {
    constructor(private partecipationResourceService: PartecipationResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.partecipationResourceService.getPartecipationUsingGET(id);
    }
}
