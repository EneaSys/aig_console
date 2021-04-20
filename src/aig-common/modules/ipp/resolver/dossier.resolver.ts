import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DossierDTO, DossierResourceService } from 'aig-italianlegislation';

@Injectable()
export class DossierResolver implements Resolve<Observable<DossierDTO>> {
    constructor(private dossierResourceService: DossierResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.dossierResourceService.getDossierUsingGET(id);
    }
}

