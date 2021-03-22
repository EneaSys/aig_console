import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-catalog-item-list-table',
    templateUrl: './catalog-item-list-table.component.html',
    styleUrls: ['./catalog-item-list-table.component.scss']
})
export class AigCatalogItemListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}