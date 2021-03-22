import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-price-list-table',
    templateUrl: './price-list-table.component.html',
    styleUrls: ['./price-list-table.component.scss']
})
export class AigPriceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}