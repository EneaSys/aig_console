import { Injectable } from '@angular/core';
import { WalletDTO } from 'aig-wallet';

@Injectable()
export class AigWalletAutocompleteDisplayService {
    
    walletDisplayFn (wallet?: WalletDTO): string | undefined {
        return wallet ? wallet.description : undefined;
    }
    
    





}