import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-ipp-lot-type-list-table',
    templateUrl: './ipp-lot-type-list-table.component.html',
    styleUrls: ['./ipp-lot-type-list-table.component.scss']
})
export class AigIppLotTypeListTableComponent implements OnInit {
    constructor() { }
    
    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
