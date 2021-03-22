import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-catalog-list-table',
    templateUrl: './catalog-list-table.component.html',
    styleUrls: ['./catalog-list-table.component.scss']
})
export class AigCatalogListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}