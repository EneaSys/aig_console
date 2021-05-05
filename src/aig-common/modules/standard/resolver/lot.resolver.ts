import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {IlPpProcurementLotTypeResourceService, IlPpProcurementLotTypeDTO } from 'aig-standard';

@Injectable()
export class LotResolver implements Resolve<Observable<IlPpProcurementLotTypeDTO>> {
    constructor(private ippLotTypeResourceService: IlPpProcurementLotTypeResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.ippLotTypeResourceService.getIlPpProcurementLotTypeUsingGET(id);
    }
}