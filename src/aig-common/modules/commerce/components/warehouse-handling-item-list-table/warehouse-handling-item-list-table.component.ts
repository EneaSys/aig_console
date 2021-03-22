import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'aig-warehouse-handling-item-list-table',
    templateUrl: './warehouse-handling-item-list-table.component.html',
    styleUrls: ['./warehouse-handling-item-list-table.component.scss']
})
export class AigWarehouseHandlingItemListTableComponent implements OnInit, OnChanges {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }

	ngOnChanges(changes: SimpleChanges): void {
		console.log("table", changes);
	}
}
