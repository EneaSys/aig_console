import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';

@Injectable()
export class AigInventoryItemResolver implements Resolve<Observable<InventoryItemDTO>> {
    constructor(private inventoryItemResourceService: InventoryItemResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idInventoryItem: number = +route.paramMap.get('id');
        return this.inventoryItemResourceService.getInventoryItemUsingGET(idInventoryItem);
    }
}