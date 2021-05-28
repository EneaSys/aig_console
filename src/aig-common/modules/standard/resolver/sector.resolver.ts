import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlPpProcurementSectorDTO, IlPpProcurementSectorResourceService } from 'aig-standard';

@Injectable()
export class SectorResolver implements Resolve<Observable<IlPpProcurementSectorDTO>> {
    constructor(private ippSectorResourceService: IlPpProcurementSectorResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.ippSectorResourceService.getIlPpProcurementSectorUsingGET(id);
    }
}