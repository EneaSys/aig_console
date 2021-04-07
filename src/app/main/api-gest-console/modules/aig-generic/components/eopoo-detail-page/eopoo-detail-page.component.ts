import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EopooResourceService, EopooDTO, AddressResourceService, AddressDTO } from 'aig-generic';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';
import { AigAddressNewUpdateModalComponent } from '../address-new-update-modal/address-new-update-modal.component';
import { ContextUserEopooResourceService, ContextUserEopooDTO } from 'api-gest';
import { SellerResourceService, SellerDTO } from 'aig-commerce';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';


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
        private contextUserEopooResourceService: ContextUserEopooResourceService,
        private sellerResourceService: SellerResourceService,
        private addressResourceService: AddressResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    eopooDTO: EopooDTO;

    addressDisplayedColumns: string[] = ['name', 'address', 'city', 'buttons'];

    addressDTOs: AddressDTO[];
    contextUserEopooDTOs: ContextUserEopooDTO[];
    sellerDTOs: SellerDTO[];

    loadPage() {
        this.eopooDTO = this.route.snapshot.data.eopoo;
    }

    async reloadPage() {
        this.eopooDTO = await this.eopooResourceService.getEopooUsingGET(this.eopooDTO.id).toPromise();
    }

    async afterLoad() {
        let filters = {
            sellerEopooIdEqual: +this.eopooDTO.id
        };
        this.addressDTOs = await this.addressResourceService.getAllAddressesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, this.eopooDTO.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 10, null).toPromise();
        this.contextUserEopooDTOs = await this.contextUserEopooResourceService.getAllContextUserEopoosUsingGET(null, null, null, null, null, null, null, null, null, null, this.eopooDTO.id+"", null, null, null, null, null, null, null, null, null, null, null, null, null, null).toPromise();
        this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET(filters).toPromise()
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

    addAddress(eopooDTO: EopooDTO) {
        this.dialog.open(AigAddressNewUpdateModalComponent, { data: { eopoo: eopooDTO } });
    }
}
