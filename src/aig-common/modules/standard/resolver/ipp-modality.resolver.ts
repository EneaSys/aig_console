import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlPpProcurementModalityResourceService, IlPpProcurementModalityDTO  } from 'aig-standard';

@Injectable()
export class IppModalityResolver implements Resolve<Observable<IlPpProcurementModalityDTO>> {
    constructor(private ippModalityResourceService: IlPpProcurementModalityResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.ippModalityResourceService.getIlPpProcurementModalityUsingGET(id);
    }
}