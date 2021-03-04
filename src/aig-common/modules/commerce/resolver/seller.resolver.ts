import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { SellerDTO, SellerResourceService } from "aig-commerce";
import { Observable } from "rxjs";

@Injectable()
export class AigSellerResolver implements Resolve<Observable<SellerDTO>> {

    constructor(private sellerResourceService: SellerResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idSeller: number = +route.paramMap.get('id');
        return this.sellerResourceService.getSellerUsingGET(idSeller);
    }
}