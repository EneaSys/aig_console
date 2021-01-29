import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'inventory-category-list-table',
    templateUrl: './inventory-category-list-table.component.html',
    styleUrls: ['./inventory-category-list-table.component.scss']
})
export class InventoryCategoryListTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}