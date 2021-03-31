import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';

@Injectable()
export class AigInventoryCategoryResolver implements Resolve<Observable<InventoryCategoryDTO>> {

    constructor(private inventoryCategoryResourceService: InventoryCategoryResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idInventoryCategory: number = +route.paramMap.get('id');
        return this.inventoryCategoryResourceService.getInventoryCategoryUsingGET(idInventoryCategory);
    }
}