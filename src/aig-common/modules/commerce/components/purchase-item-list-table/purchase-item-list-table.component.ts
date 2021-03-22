import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-purchase-item-list-table',
    templateUrl: './purchase-item-list-table.component.html',
    styleUrls: ['./purchase-item-list-table.component.scss']
})
export class AigPurchaseItemListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }
}