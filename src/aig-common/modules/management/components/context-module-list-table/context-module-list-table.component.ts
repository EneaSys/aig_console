import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'aig-context-module-list-table',
    templateUrl: './context-module-list-table.component.html',
    styleUrls: ['./context-module-list-table.component.scss'],
})
export class AigContextModuleListTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(){ }

    ngOnInit(): void {}

}