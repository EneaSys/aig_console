import { Component, OnInit, Input } from '@angular/core';
import { AddressDTO, AddressResourceService } from 'aig-generic';
import { MatDialog } from '@angular/material/dialog';
import { AigAddressNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-generic/components/address-new-update-modal/address-new-update-modal.component';
import { EventService } from 'aig-common/event-manager/event.service';

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

    async deleteAddress(addressDTO: AddressDTO) {
        await this.addressResourceService.deleteAddressUsingDELETE(addressDTO.id).toPromise();
        this.eventService.reloadCurrentPage();
    }
}
