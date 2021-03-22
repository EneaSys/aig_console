import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-inventory-item-purchase-list-table',
    templateUrl: './inventory-item-purchase-list-table.component.html',
    styleUrls: ['./inventory-item-purchase-list-table.component.scss']
})
export class AigInventoryItemPurchaseListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}