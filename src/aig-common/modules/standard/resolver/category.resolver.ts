import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotCategoryResourceService } from 'aig-standard';

@Injectable()
export class CategoryResolver implements Resolve<Observable<ItalianPublicProcurementLotCategoryDTO>> {
    constructor(private ippCategotyResourceService: ItalianPublicProcurementLotCategoryResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.ippCategotyResourceService.getItalianPublicProcurementLotCategoryUsingGET(id);
    }
}