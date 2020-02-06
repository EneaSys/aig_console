import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementModalityDTO  } from 'aig-standard';

@Injectable()
export class IppModalityResolver implements Resolve<Observable<ItalianPublicProcurementModalityDTO>> {
    constructor(private roleResourceService: ItalianPublicProcurementModalityResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.roleResourceService.getItalianPublicProcurementModalityUsingGET(id);
    }
}