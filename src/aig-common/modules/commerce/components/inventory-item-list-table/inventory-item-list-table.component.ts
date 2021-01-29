import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-inventory-item-list-table',
    templateUrl: './inventory-item-list-table.component.html',
    styleUrls: ['./inventory-item-list-table.component.scss']
})
export class AigInventoryItemListTableComponent implements OnInit {
    @Input()
    inventoryItemError: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }
}
