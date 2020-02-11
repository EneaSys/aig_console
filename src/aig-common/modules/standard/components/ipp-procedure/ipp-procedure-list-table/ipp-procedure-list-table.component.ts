import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-ipp-procedure-list-table',
    templateUrl: './ipp-procedure-list-table.component.html',
    styleUrls: ['./ipp-procedure-list-table.component.scss']
})
export class AigIppProcedureListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
