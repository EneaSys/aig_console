import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogItemDTO, CatalogItemResourceService } from 'aig-commerce';

@Injectable()
export class AigCatalogItemResolver implements Resolve<Observable<CatalogItemDTO>> {

    constructor(private catalogItemResourceService: CatalogItemResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idCatalogItem: number = +route.paramMap.get('id');
        return this.catalogItemResourceService.getCatalogItemUsingGET(idCatalogItem);
    }
}