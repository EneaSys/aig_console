import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'warehouse-handling-list-table',
    templateUrl: './warehouse-handling-list-table.component.html',
    styleUrls: ['./warehouse-handling-list-table.component.scss']
})
export class AigWarehouseHandlingListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}