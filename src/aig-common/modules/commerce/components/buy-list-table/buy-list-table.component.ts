import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-buy-list-table',
    templateUrl: './buy-list-table.component.html',
    styleUrls: ['./buy-list-table.component.scss']
})
export class AigBuyListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }
}
