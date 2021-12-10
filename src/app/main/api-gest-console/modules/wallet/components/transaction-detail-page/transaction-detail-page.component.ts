import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { WalletResourceService, WalletDTO, CreditCardResourceService, CreditCardDTO, TransactionDTO, TransactionResourceService, GiveHaveResourceService, GiveHaveDTO } from 'aig-wallet';

import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { Config } from 'protractor';
import { HttpClient } from '@angular/common/http';



@Component({
    templateUrl: './transaction-detail-page.component.html',
    styleUrls: ['./transaction-detail-page.component.scss']
})
export class AigTransactionDetailPageComponent extends GenericComponent {
	
    constructor(
        private route: ActivatedRoute,
		private giveHaveResourceService: GiveHaveResourceService,
		private transactionResourceService: TransactionResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    transactionDTO: TransactionDTO;
	giveHaveDTO: GiveHaveDTO;

    loadPage() {
        this.transactionDTO = this.route.snapshot.data.transaction;
		
		this.loadGiveHave();
		
    }

    async reloadPage() {
        this.transactionDTO = await this.transactionResourceService.getTransactionUsingGET(this.transactionDTO.id).toPromise();

		this.loadGiveHave();
    }
    

	// GIVE HAVE Section
	giveHaveDC: string[] = ["amount", "transaction", "type","wallet" ,"buttons"];
    giveHaveDTOsINPUT: GiveHaveDTO[];
	giveHaveDTOsOUTPUT: GiveHaveDTO[];
    giveHaveError: any;

    async loadGiveHave() {
		try {
			let filters: any = {
				transactionIDEquals: this.transactionDTO.id,
			};
			filters.giveHaveTypeEquals = "INPUT";
			this.giveHaveDTOsINPUT = await this.giveHaveResourceService.getAllGiveHavesUsingGET(filters).toPromise();

			filters.giveHaveTypeEquals = "OUTPUT";
			this.giveHaveDTOsOUTPUT = await this.giveHaveResourceService.getAllGiveHavesUsingGET(filters).toPromise();
		} catch(e) {
			this.giveHaveError = e;
		}
    }


	



}