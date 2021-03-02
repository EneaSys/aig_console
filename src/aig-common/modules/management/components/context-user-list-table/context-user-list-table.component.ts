import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'aig-context-user-list-table',
    templateUrl: './context-user-list-table.component.html',
    styleUrls: ['./context-user-list-table.component.scss'],
})
export class AigContextUserListTableComponent implements OnInit {
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