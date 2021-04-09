import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EopooResourceService, EopooDTO, AddressResourceService, AddressDTO } from 'aig-generic';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';
import { AigAddressNewUpdateModalComponent } from '../address-new-update-modal/address-new-update-modal.component';
import { ContextUserEopooResourceService, ContextUserEopooDTO } from 'api-gest';
import { SellerResourceService, SellerDTO } from 'aig-commerce';


@Component({
    templateUrl: './eopoo-detail-page.component.html',
    styleUrls: ['./eopoo-detail-page.component.scss']
})
export class AigEopooDetailPageComponent extends GenericComponent {
    constructor(
        private eopooResourceService: EopooResourceService,
        private contextUserEopooResourceService: ContextUserEopooResourceService,
        private sellerResourceService: SellerResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
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
        this.addressDTOs = await this.addressResourceService.getAllAddressesUsingGET().toPromise();
        this.contextUserEopooDTOs = await this.contextUserEopooResourceService.getAllContextUserEopoosUsingGET().toPromise();
        this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET(filters).toPromise()
    }


    editEopoo(eopooDTO: EopooDTO) {
        this.dialog.open(AigEopooNewModalComponent, { data: { eopoo: eopooDTO } });
    }

    addAddress(eopooDTO: EopooDTO) {
        this.dialog.open(AigAddressNewUpdateModalComponent, { data: { eopoo: eopooDTO } });
    }
}
