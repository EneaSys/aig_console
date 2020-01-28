import { Component, OnInit, Input } from '@angular/core';
import { EopooTypeDTO } from 'aig-generic';

@Component({
    selector: 'aig-eopoo-type-list-table',
    templateUrl: './eopoo-type-list-table.component.html',
    styleUrls: ['./eopoo-type-list-table.component.scss']
})
export class AigEopooTypeListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: EopooTypeDTO[];

    ngOnInit(): void { }
}
