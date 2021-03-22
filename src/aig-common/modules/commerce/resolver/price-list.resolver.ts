import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PriceListDTO, PriceListResourceService } from 'aig-commerce';

@Injectable()
export class AigPriceListResolver implements Resolve<Observable<PriceListDTO>> {

    constructor(private priceListResourceService: PriceListResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idPriceList: number = +route.paramMap.get('id');
        return this.priceListResourceService.getPriceListUsingGET(idPriceList);
    }
}