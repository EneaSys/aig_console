import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItalianPublicProcurementSectorDTO, ItalianPublicProcurementSectorResourceService } from 'aig-standard';

@Injectable()
export class SectorResolver implements Resolve<Observable<ItalianPublicProcurementSectorDTO>> {
    constructor(private ippSectorResourceService: ItalianPublicProcurementSectorResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.ippSectorResourceService.getItalianPublicProcurementSectorUsingGET(id);
    }
}