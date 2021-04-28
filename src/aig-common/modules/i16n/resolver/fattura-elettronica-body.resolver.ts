import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FatturaElettronicaBodyDTO, FatturaElettronicaBodyResourceService } from 'aig-italianlegislation';

@Injectable()
export class FatturaElettronicaBodyResolver implements Resolve<Observable<FatturaElettronicaBodyDTO>> {
    constructor(private fatturaElettronicaBodyResourceService: FatturaElettronicaBodyResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.fatturaElettronicaBodyResourceService.getFatturaElettronicaBodyUsingGET(id);
    }
}
