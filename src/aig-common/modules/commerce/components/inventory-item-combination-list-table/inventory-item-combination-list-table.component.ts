import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-inventory-item-combination-list-table',
    templateUrl: './inventory-item-combination-list-table.component.html',
    styleUrls: ['./inventory-item-combination-list-table.component.scss']
})
export class AigInventoryItemCombinationListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}