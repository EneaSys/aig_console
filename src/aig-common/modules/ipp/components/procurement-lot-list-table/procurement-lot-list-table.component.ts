import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'procurement-lot-list-table',
    templateUrl: './procurement-lot-list-table.component.html',
    styleUrls: ['./procurement-lot-list-table.component.scss']
})
export class AigProcurementLotListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
