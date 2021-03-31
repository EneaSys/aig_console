import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PurchaseDTO, PurchaseResourceService } from 'aig-commerce';

@Injectable()
export class PurchaseResolver implements Resolve<Observable<PurchaseDTO>> {
    constructor(private purchaseResourceService: PurchaseResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.purchaseResourceService.getPurchaseUsingGET(id);
    }
}

