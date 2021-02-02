import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-warehouse-list-table',
    templateUrl: './warehouse-list-table.component.html',
    styleUrls: ['./warehouse-list-table.component.scss']
})
export class AigWarehouseListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }
}
