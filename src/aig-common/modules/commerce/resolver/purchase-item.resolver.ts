import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PurchaseItemDTO, PurchaseItemResourceService} from 'aig-commerce';

@Injectable()
export class PurchaseItemResolver implements Resolve<Observable<PurchaseItemDTO>> {
    constructor(private purchaseItemResourceService: PurchaseItemResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.purchaseItemResourceService.getPurchaseItemUsingGET(id);
    }
}