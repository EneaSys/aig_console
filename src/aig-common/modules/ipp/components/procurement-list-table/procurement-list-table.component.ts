import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-procurement-list-table',
    templateUrl: './procurement-list-table.component.html',
    styleUrls: ['./procurement-list-table.component.scss']
})
export class AigProcurementListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
