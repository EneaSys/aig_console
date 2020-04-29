import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-buyer-list-table',
    templateUrl: './buyer-list-table.component.html',
    styleUrls: ['./buyer-list-table.component.scss']
})
export class AigBuyerListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    constructor() { }

    ngOnInit(): void { }
}
