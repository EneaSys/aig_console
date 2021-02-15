import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { WarehouseDTO, WarehouseResourceService } from "aig-commerce";
import { Observable } from "rxjs";


@Injectable()
export class AigWarehouseResolver implements Resolve<Observable<WarehouseDTO>> {

    constructor(private warehouseResourceService: WarehouseResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idWarehouse: number = +route.paramMap.get('id');
        return this.warehouseResourceService.getWarehouseUsingGET(idWarehouse);
    }
}