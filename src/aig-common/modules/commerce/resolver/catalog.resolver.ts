import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogDTO, CatalogResourceService } from 'aig-commerce';

@Injectable()
export class AigCatalogResolver implements Resolve<Observable<CatalogDTO>> {

    constructor(private catalogResourceService: CatalogResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idCatalog: number = +route.paramMap.get('id');
        return this.catalogResourceService.getCatalogUsingGET(idCatalog);
    }
}