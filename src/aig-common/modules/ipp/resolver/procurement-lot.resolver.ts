import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italianlegislation';

@Injectable()
export class ProcurementLotResolver implements Resolve<Observable<ProcurementLotDTO>> {
    constructor(private procurementLotResourceService: ProcurementLotResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.procurementLotResourceService.getProcurementLotUsingGET(id);
    }
}

