import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService } from 'aig-commerce';

@Injectable()
export class AigInventoryItemCombinationResolver implements Resolve<Observable<InventoryItemCombinationDTO>> {
    constructor(private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idInventoryItemCombination: number = +route.paramMap.get('id');
        return this.inventoryItemCombinationResourceService.getInventoryItemCombinationUsingGET(idInventoryItemCombination);
    }
}