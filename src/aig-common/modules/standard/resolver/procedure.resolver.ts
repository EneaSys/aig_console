import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlPpProcurementProcedureResourceService, IlPpProcurementProcedureDTO } from 'aig-standard';

@Injectable()
export class IppProcedureResolver implements Resolve<Observable<IlPpProcurementProcedureDTO>> {
    constructor(private ippProcedureResourceService: IlPpProcurementProcedureResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.ippProcedureResourceService.getIlPpProcurementProcedureUsingGET(id);
    }
}