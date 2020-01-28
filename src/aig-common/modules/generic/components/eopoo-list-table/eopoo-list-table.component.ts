import { Component, OnInit, Input } from '@angular/core';
import { EopooDTO } from 'aig-generic';

@Component({
    selector: 'aig-eopoo-list-table',
    templateUrl: './eopoo-list-table.component.html',
    styleUrls: ['./eopoo-list-table.component.scss']
})
export class AigEopooListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: EopooDTO[];

    ngOnInit(): void { }
}
