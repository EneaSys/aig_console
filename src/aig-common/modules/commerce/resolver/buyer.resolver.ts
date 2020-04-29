import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BuyerDTO, BuyerResourceService } from 'aig-commerce';

@Injectable()
export class BuyerResolver implements Resolve<Observable<BuyerDTO>> {
    constructor(private buyerResourceService: BuyerResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.buyerResourceService.getBuyerUsingGET(id);
    }
}