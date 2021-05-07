import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlPpProcurementLotStatusDTO, IlPpProcurementLotStatusResourceService, IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';

@Injectable()
export class ProcurementLotStatusResolver implements Resolve<Observable<IlPpProcurementLotStatusDTO>> {
    constructor(private procurementLotStatusResourceService: IlPpProcurementLotStatusResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.procurementLotStatusResourceService.getIlPpProcurementLotStatusUsingGET(id);
    }
}