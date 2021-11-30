import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WalletDTO, WalletResourceService } from 'aig-wallet';

@Injectable()
export class WalletResolver implements Resolve<Observable<WalletDTO>> {
    constructor(private walletResourceService: WalletResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idBuyer: number = +route.paramMap.get('id');
        return this.walletResourceService.getWalletUsingGET(idBuyer);
    }
}