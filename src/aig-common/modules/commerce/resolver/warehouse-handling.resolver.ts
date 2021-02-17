import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';

@Injectable()
export class AigWarehouseHandlingResolver implements Resolve<Observable<WarehouseHandlingDTO>> {

    constructor(private warehouseHandlingResourceService: WarehouseHandlingResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idWarehouseHandling: number = +route.paramMap.get('id');
        return this.warehouseHandlingResourceService.getWarehouseHandlingUsingGET(idWarehouseHandling);
    }
}