import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { WalletResourceService, WalletDTO, CreditCardResourceService, CreditCardDTO, TransactionDTO, TransactionResourceService } from 'aig-wallet';

import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';

import { AigMerchantService } from 'aig-common/modules/wallet/services/merchant.service';
import { AigMerchantNewUpdateDialogComponent } from '../merchant-new-update-dialog/merchant-new-update-dialog.component';
import { AigWalletNewUpdateDialogComponent } from '../wallet-new-update-dialog/wallet-new-update-dialog.component';
import { AigCreditCardNewUpdateDialogComponent } from '../credit-card-new-update-dialog/credit-card-new-update-dialog.component';
import { AigTransactionNewDialogComponent } from '../transaction-new-dialog/transaction-new-dialog.component';


@Component({
    templateUrl: './wallet-detail-page.component.html',
    styleUrls: ['./wallet-detail-page.component.scss']
})
export class AigWalletDetailPageComponent extends GenericComponent {
    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
		private walletResourceService: WalletResourceService,
		private merchantService: AigMerchantService,
		private creditCardResourceService: CreditCardResourceService,
		private transactionResourceService: TransactionResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    walletDTO: WalletDTO;

    loadPage() {
        this.walletDTO = this.route.snapshot.data.wallet;
		
		this.loadPos();
		this.loadCreditCard();
		this.loadTransaction();
    }

    async reloadPage() {
        this.walletDTO = await this.walletResourceService.getWalletUsingGET(this.walletDTO.id).toPromise();

		this.loadPos();
		this.loadCreditCard();
		this.loadTransaction();
    }

    editWallet(walletDTO: WalletDTO) {
        this.dialog.open(AigWalletNewUpdateDialogComponent, { data: { wallet: walletDTO } });
    }

    async deleteWallet(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.walletResourceService.deleteWalletUsingDELETE(id).toPromise();

            this._snackBar.open(`Wallet: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/g5c', 'wallet']);
        } catch (e) {
            this._snackBar.open(`Error during deleting wallet: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    

	// POS Section
	posDC: string[] = ["name", "username", "password", "buttons"];
    posDTOs: any[];
    posError: any;

    async loadPos() {
		try {
			let filters = {
				'merchantWalletID.equals': this.walletDTO.id,
			};
			this.posDTOs = await this.merchantService.getMerchants(filters).toPromise();
		} catch(e) {
			this.posError = e;
		}
    }

    addPos(walletDTO: WalletDTO) {
        this.dialog.open(AigMerchantNewUpdateDialogComponent, { data: { wallet: walletDTO } });
    }



	// CreditCard Section
	creditCardDC: string[] = ["code", "pin", "buttons"];
    creditCardDTOs: CreditCardDTO[];
    creditCardError: any;

    async loadCreditCard() {
		try {
			let filters = {
				walletIDEquals: this.walletDTO.id,
			};
			this.creditCardDTOs = await this.creditCardResourceService.getAllCreditCardsUsingGET(filters).toPromise();
		} catch(e) {
			this.creditCardError = e;
		}
    }

    addCreditCard(walletDTO: WalletDTO) {
        this.dialog.open(AigCreditCardNewUpdateDialogComponent, { data: { wallet: walletDTO } });
    }



	// Transaction
	transactionDC: string[] = ['id','creationDateTime','sender','reciver'];
    transactionDTOs: TransactionDTO[];
    transactionError: any;

    async loadTransaction() {
		try {
			let filters = {
				walletIdEquals: this.walletDTO.id,
			};
			this.transactionDTOs = await this.transactionResourceService.getAllTransactionsUsingGET(filters).toPromise();
		} catch(e) {
			this.transactionError = e;
		}
    }

	addTransaction(walletDTO: WalletDTO) {
        this.dialog.open(AigTransactionNewDialogComponent, { data: { wallet: walletDTO } });
    }


}