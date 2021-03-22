import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-purchase-list-table',
    templateUrl: './purchase-list-table.component.html',
    styleUrls: ['./purchase-list-table.component.scss']
})
export class AigPurchaseListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }
}