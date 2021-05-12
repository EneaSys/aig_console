import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AddressDTO, AddressResourceService } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigAddressNewUpdateModalComponent } from '../address-new-update-modal/address-new-update-modal.component';

@Component({
    templateUrl: './address-detail-page.component.html',
    styleUrls: ['./address-detail-page.component.scss']
})
export class AigAddressDetailPageComponent extends GenericComponent {
    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private addressResourceService: AddressResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    addressDTO: AddressDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.addressDTO = this.route.snapshot.data.address;
        } else {
            this.addressDTO = await this.addressResourceService.getAddressUsingGET(this.addressDTO.id).toPromise();
        }
    }

    editAddress(addressDTO: AddressDTO) {
        console.log(this.addressDTO);
        console.log(addressDTO);
        this.dialog.open(AigAddressNewUpdateModalComponent, { data: { address: addressDTO } });
    }

    async deleteAddress(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.addressResourceService.deleteAddressUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Address: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/g5c', 'address']);
        } catch (e) {
            this._snackBar.open(`Error during deleting address: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
}