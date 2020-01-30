import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-cpv-list-table',
    templateUrl: './cpv-list-table.component.html',
    styleUrls: ['./cpv-list-table.component.scss']
})
export class AigCpvListTableComponent implements OnInit {
    constructor() { }

    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
