import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'aig-context-module-list-table',
    templateUrl: './context-module-list-table.component.html',
    styleUrls: ['./context-module-list-table.component.scss'],
})
export class AigContextModuleListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private router: Router,
    ){ }

    ngOnInit(): void {}

}