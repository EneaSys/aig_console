import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlPpProcurementLotCategoryDTO, IlPpProcurementLotCategoryResourceService } from 'aig-standard';

@Injectable()
export class CategoryResolver implements Resolve<Observable<IlPpProcurementLotCategoryDTO>> {
    constructor(private ippCategotyResourceService: IlPpProcurementLotCategoryResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.ippCategotyResourceService.getIlPpProcurementLotCategoryUsingGET(id);
    }
}