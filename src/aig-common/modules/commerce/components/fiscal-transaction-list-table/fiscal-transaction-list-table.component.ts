import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-fiscal-transaction-list-table',
    templateUrl: './fiscal-transaction-list-table.component.html',
    styleUrls: ['./fiscal-transaction-list-table.component.scss']
})
export class AigFiscalTransactionListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }
}
