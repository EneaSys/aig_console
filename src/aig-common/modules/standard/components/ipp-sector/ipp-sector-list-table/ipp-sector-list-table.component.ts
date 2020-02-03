import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-ipp-sector-list-table',
    templateUrl: './ipp-sector-list-table.component.html',
    styleUrls: ['./ipp-sector-list-table.component.scss']
})
export class AigIppSectorListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
