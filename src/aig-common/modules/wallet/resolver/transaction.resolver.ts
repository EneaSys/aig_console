import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TransactionDTO, TransactionResourceService,  } from 'aig-wallet';

@Injectable()
export class TransactionResolver implements Resolve<Observable<TransactionDTO>> {
    constructor(private transactionResourceService: TransactionResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idTransaction: number = +route.paramMap.get('id');
        return this.transactionResourceService.getTransactionUsingGET(idTransaction);
    }
}