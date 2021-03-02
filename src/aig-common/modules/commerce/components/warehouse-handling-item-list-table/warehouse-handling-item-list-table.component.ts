import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-warehouse-handling-item-list-table',
    templateUrl: './warehouse-handling-item-list-table.component.html',
    styleUrls: ['./warehouse-handling-item-list-table.component.scss']
})
export class AigWarehouseHandlingItemListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}
