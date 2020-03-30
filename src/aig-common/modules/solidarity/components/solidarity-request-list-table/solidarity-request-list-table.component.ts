import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-solidarity-request-list-table',
    templateUrl: './solidarity-request-list-table.component.html',
    styleUrls: ['./solidarity-request-list-table.component.scss']
})
export class AigSolidarityRequestListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    
    ngOnInit(): void { }
}
