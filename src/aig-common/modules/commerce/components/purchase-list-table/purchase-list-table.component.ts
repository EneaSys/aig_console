import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-purchase-list-table',
    templateUrl: './purchase-list-table.component.html',
    styleUrls: ['./purchase-list-table.component.scss']
})
export class AigPurchaseListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}