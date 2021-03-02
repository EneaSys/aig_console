import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-role-list-table',
    templateUrl: './role-list-table.component.html',
    styleUrls: ['./role-list-table.component.scss']
})
export class AigRoleListTableComponent implements OnInit {
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
