import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { WalletResourceService } from 'aig-wallet';

@Injectable()
export class AigWalletAutocompleteFilterService {

    constructor(
        private walletResourceService: WalletResourceService,
    ) {}


    filterWallet(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
				let filter: any = {
					expirationDateGreaterThan: new Date()
				};
                if (value && value.length > 0) {
					filter.descriptionContains = value;
				}
				return this.walletResourceService.getAllWalletsUsingGET(filter);
			})
		);
	}




}