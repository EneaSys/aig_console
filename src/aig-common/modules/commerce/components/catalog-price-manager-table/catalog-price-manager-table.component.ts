import { Component, Input, OnInit } from '@angular/core';
import { CatalogDTO } from 'aig-commerce';

@Component({
    selector: 'aig-catalog-price-manager-table',
    templateUrl: './catalog-price-manager-table.component.html',
    styleUrls: ['./catalog-price-manager-table.component.scss']
})
export class AigCatalogPriceManagerTableComponent implements OnInit {
    @Input()
	staticCatalog: CatalogDTO = null;
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}