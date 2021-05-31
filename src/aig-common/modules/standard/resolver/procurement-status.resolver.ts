import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';

@Injectable()
export class ProcurementStatusResolver implements Resolve<Observable<IlPpProcurementStatusDTO>> {
    constructor(private procurementStatusResourceService: IlPpProcurementStatusResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.procurementStatusResourceService.getIlPpProcurementStatusUsingGET(id);
    }
}