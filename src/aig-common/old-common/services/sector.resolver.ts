import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItalianPublicProcurementSectorDTO, ItalianPublicProcurementSectorResourceService } from 'aig-standard';

@Injectable()
export class SectorResolver implements Resolve<Observable<ItalianPublicProcurementSectorDTO>> {
    constructor(private roleResourceService: ItalianPublicProcurementSectorResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('fdsafdsa');
        var id: number = +route.paramMap.get('id');
        return this.roleResourceService.getItalianPublicProcurementSectorUsingGET(id);
    }
}