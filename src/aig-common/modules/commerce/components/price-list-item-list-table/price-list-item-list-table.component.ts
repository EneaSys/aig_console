import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-price-list-item-list-table',
    templateUrl: './price-list-item-list-table.component.html',
    styleUrls: ['./price-list-item-list-table.component.scss']
})
export class AigPriceListItemListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}