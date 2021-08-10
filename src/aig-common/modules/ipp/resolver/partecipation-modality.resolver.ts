import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PartecipationDTO,PartecipationModalityDTO,PartecipationModalityResourceService,PartecipationResourceService } from 'aig-italianlegislation';

@Injectable()
export class PartecipationModalityResolver implements Resolve<Observable<PartecipationModalityDTO>> {
    constructor(private partecipationModalityResourceService: PartecipationModalityResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.partecipationModalityResourceService.getPartecipationModalityUsingGET(id);
    }
}
