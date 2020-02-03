import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItalianPublicProcurementLotTypeResourceService, ItalianPublicProcurementLotTypeDTO } from 'aig-standard';

@Injectable()
export class LotResolver implements Resolve<Observable<ItalianPublicProcurementLotTypeDTO>> {
    constructor(private roleResourceService: ItalianPublicProcurementLotTypeResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.roleResourceService.getItalianPublicProcurementLotTypeUsingGET(id);
    }
}