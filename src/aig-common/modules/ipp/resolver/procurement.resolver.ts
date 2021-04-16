import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {ProcurementDTO, ProcurementResourceService } from 'aig-italianlegislation';

@Injectable()
export class ProcurementResolver implements Resolve<Observable<ProcurementDTO>> {
    constructor(private procurementResourceService: ProcurementResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.procurementResourceService.getProcurementUsingGET(id);
    }
}

