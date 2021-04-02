import { Component, Input, OnInit } from '@angular/core';
import { CatalogDTO, InventoryItemDTO, WarehouseDTO } from 'aig-commerce';


@Component({
    selector: 'entity-detail-warehouse',
    templateUrl: './entity-detail-warehouse.component.html',
    styleUrls: ['./entity-detail-warehouse.component.scss']
})
export class AigEntityDetailWarehouseComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    warehouseDTO: WarehouseDTO;

}