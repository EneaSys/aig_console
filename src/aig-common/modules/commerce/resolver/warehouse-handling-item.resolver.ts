import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WarehouseHandlingDTO, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService, WarehouseHandlingResourceService } from 'aig-commerce';

@Injectable()
export class AigWarehouseHandlingItemResolver implements Resolve<Observable<WarehouseHandlingItemDTO>> {

    constructor(private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idWarehouseHandlingItem: number = +route.paramMap.get('id');
        return this.warehouseHandlingItemResourceService.getWarehouseHandlingItemUsingGET(idWarehouseHandlingItem);
    }
}