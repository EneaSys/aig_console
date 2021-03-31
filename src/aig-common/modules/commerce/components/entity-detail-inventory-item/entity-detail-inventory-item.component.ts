import { Component, Input, OnInit } from '@angular/core';
import { InventoryItemDTO } from 'aig-commerce';


@Component({
    selector: 'entity-detail-inventory-item',
    templateUrl: './entity-detail-inventory-item.component.html',
    styleUrls: ['./entity-detail-inventory-item.component.scss']
})
export class AigEntityDetailInventoryItemComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    inventoryItemDTO: InventoryItemDTO;

}
