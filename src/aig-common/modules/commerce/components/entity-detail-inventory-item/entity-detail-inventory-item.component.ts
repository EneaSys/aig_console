import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryItemDTO } from 'aig-commerce';


@Component({
    selector: 'entity-detail-inventory-item',
    templateUrl: './entity-detail-inventory-item.component.html',
    styleUrls: ['./entity-detail-inventory-item.component.scss']
})
export class AigEntityDetailInventoryItemComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
    ) { }
    ngOnInit(): void {
        this.loadPage();
    }

    inventoryItemDTO: InventoryItemDTO;

    loadPage() {
        this.inventoryItemDTO = this.route.snapshot.data.inventoryItem;
    }
}
