import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';

@Injectable()
export class AigPriceListItemResolver implements Resolve<Observable<PriceListItemDTO>> {

    constructor(private priceListItemResourceService: PriceListItemResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idPriceListItem: number = +route.paramMap.get('id');
        return this.priceListItemResourceService.getPriceListItemUsingGET(idPriceListItem);
    }
}