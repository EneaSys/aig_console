import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FiscalTransactionDTO, FiscalTransactionResourceService } from 'aig-commerce';

@Injectable()
export class FiscalTransactionResolver implements Resolve<Observable<FiscalTransactionDTO>> {
    constructor(private fiscalTransactionResourceService: FiscalTransactionResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.fiscalTransactionResourceService.getFiscalTransactionUsingGET(id);
    }
}