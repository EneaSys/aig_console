import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EopooResourceService, EopooDTO, AddressResourceService, AddressDTO, ContactResourceService, ContactDTO, ReferentDTO, ReferentResourceService } from 'aig-generic';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';
import { AigAddressNewUpdateModalComponent } from '../address-new-update-modal/address-new-update-modal.component';
import { ContextUserEopooResourceService, ContextUserEopooDTO } from 'api-gest';
import { SellerResourceService, SellerDTO } from 'aig-commerce';
import { WalletResourceService, WalletDTO } from 'aig-wallet';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';
import { AigReferentNewUpdateDialogComponent } from '../referent-new-update-dialog/referent-new-update-dialog.component';
import { AigContactNewUpdateDialogComponent } from '../contact-new-update-dialog/contact-new-update-dialog.component';
import { AigMerchantService } from 'aig-common/modules/wallet/services/merchant.service';
import { AigMerchantNewUpdateDialogComponent } from '../../../wallet/components/merchant-new-update-dialog/merchant-new-update-dialog.component';
import { AigWalletNewUpdateDialogComponent } from '../../../wallet/components/wallet-new-update-dialog/wallet-new-update-dialog.component';


@Component({
    templateUrl: './eopoo-detail-page.component.html',
    styleUrls: ['./eopoo-detail-page.component.scss']
})
export class AigEopooDetailPageComponent extends GenericComponent {
    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private eopooResourceService: EopooResourceService,
        private contactResourceService: ContactResourceService,
        private referentResourceService: ReferentResourceService,
		private walletResourceService: WalletResourceService,
		private merchantService: AigMerchantService,
        private contextUserEopooResourceService: ContextUserEopooResourceService,
        private sellerResourceService: SellerResourceService,
        private addressResourceService: AddressResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    eopooDTO: EopooDTO;

    loadPage() {
        this.eopooDTO = this.route.snapshot.data.eopoo;
        this.loadAddress();
        this.loadContact();
        this.loadReferent();
		this.loadWallet();

    }

    async reloadPage() {
        this.eopooDTO = await this.eopooResourceService.getEopooUsingGET(this.eopooDTO.id).toPromise();
        this.loadAddress();
        this.loadContact();
        this.loadReferent();
		this.loadWallet();

    }

    editEopoo(eopooDTO: EopooDTO) {
        this.dialog.open(AigEopooNewModalComponent, { data: { eopoo: eopooDTO } });
    }

    async deleteEopoo(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.eopooResourceService.deleteEopooUsingDELETE(id).toPromise();

            this._snackBar.open(`Eopoo: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/g5c', 'eopoo']);
        } catch (e) {
            this._snackBar.open(`Error during deleting eopoo: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    addressDC: string[] = ['name', 'address', 'city', 'buttons'];
    addressDTOs: AddressDTO[];
    addressError: any;

    async loadAddress() {
        let filters = {
            eopooIDEquals: this.eopooDTO.id,
        };
        this.addressDTOs = await this.addressResourceService.getAllAddressesUsingGET(filters).toPromise();
    }

    addAddress(eopooDTO: EopooDTO) {
        this.dialog.open(AigAddressNewUpdateModalComponent, { data: { eopoo: eopooDTO } });
    }

    contactDC: string[] = ['contactType', 'value', 'buttons'];
    contactDTOs: ContactDTO[];
    contactError: any;

    async loadContact() {
        let filters = {
            eopooIDEquals: this.eopooDTO.id,
        };
        this.contactDTOs = await this.contactResourceService.getAllContactsUsingGET(filters).toPromise();
    }

    addContact(eopooDTO: EopooDTO) {
        this.dialog.open(AigContactNewUpdateDialogComponent, { data: { eopoo: eopooDTO } });
    }


    referentDC: string[] = ["firstname", "lastname", "position", "buttons"];
    referentDTOs: ReferentDTO[];
    referentError: any;

    async loadReferent() {
        let filters = {
            eopooIDEquals: this.eopooDTO.id,
        };
        this.referentDTOs = await this.referentResourceService.getAllReferentsUsingGET(filters).toPromise();
    }

    addReferent(eopooDTO: EopooDTO) {
        this.dialog.open(AigReferentNewUpdateDialogComponent, { data: { eopoo: eopooDTO } });
    }



	// Wallet Section
	walletDC: string[] = ["description", "buttons"];
    walletDTOs: WalletDTO[];
    walletError: any;

    async loadWallet() {
		try {
			let filters = {
				eopooCodeEquals: this.eopooDTO.id,
			};
			this.walletDTOs = await this.walletResourceService.getAllWalletsUsingGET(filters).toPromise();
		} catch(e) {
			this.walletError = e;
		}
    }

    addWallet(eopooDTO: EopooDTO) {
        this.dialog.open(AigWalletNewUpdateDialogComponent, { data: { eopoo: eopooDTO } });
    }






}