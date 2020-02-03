import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-ipp-modality-list-table',
    templateUrl: './ipp-modality-list-table.component.html',
    styleUrls: ['./ipp-modality-list-table.component.scss']
})
export class AigIppModalityListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
