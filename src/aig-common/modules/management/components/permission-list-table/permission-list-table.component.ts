import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-permission-list-table',
    templateUrl: './permission-list-table.component.html',
    styleUrls: ['./permission-list-table.component.scss']
})
export class AigPermissionListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;
   
    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { }

}
