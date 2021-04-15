import { Component, OnInit, Input } from '@angular/core';
import { AddressDTO, AddressResourceService } from 'aig-generic';
import { MatDialog } from '@angular/material/dialog';
import { AigAddressNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-generic/components/address-new-update-modal/address-new-update-modal.component';
import { EventService } from 'aig-common/event-manager/event.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'aig-address-list-table',
    templateUrl: './address-list-table.component.html',
    styleUrls: ['./address-list-table.component.scss']
})
export class AigAddressListTableComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private addressResourceService: AddressResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: AddressDTO[];
    
    ngOnInit(): void { }

    editAddress(addressDTO: AddressDTO) {
        this.dialog.open(AigAddressNewUpdateModalComponent, { data: { address: addressDTO } });
    }

    async deleteAddress(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.addressResourceService.deleteAddressUsingDELETE(id).toPromise();
            this._snackBar.open(`Address: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting address: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }
}
