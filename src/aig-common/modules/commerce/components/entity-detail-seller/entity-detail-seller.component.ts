import { Component, Input, OnInit } from '@angular/core';
import { CatalogDTO, InventoryItemDTO, SellerDTO, WarehouseDTO } from 'aig-commerce';


@Component({
    selector: 'entity-detail-seller',
    templateUrl: './entity-detail-seller.component.html',
    styleUrls: ['./entity-detail-seller.component.scss']
})
export class AigEntityDetailSellerComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    sellerDTO: SellerDTO;

}