import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PreparationModalityDTO, PreparationModalityResourceService, PreparationResourceService } from 'aig-italianlegislation';

@Injectable()
export class PreparationModalityResolver implements Resolve<Observable<PreparationModalityDTO>> {
    constructor(private preparationModalityResourceService: PreparationModalityResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.preparationModalityResourceService.getPreparationModalityUsingGET(id);
    }
}
