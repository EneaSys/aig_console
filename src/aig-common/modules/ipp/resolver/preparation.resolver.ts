import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PartecipationStatusResourceService, PreparationDTO, PreparationResourceService } from 'aig-italianlegislation';

@Injectable()
export class PreparationResolver implements Resolve<Observable<PreparationDTO>> {
    constructor(private preparationResourceService: PreparationResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.preparationResourceService.getPreparationUsingGET(id);
    }
}
