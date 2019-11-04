import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-role-table',
    templateUrl: './role-table.component.html',
    styleUrls: ['./role-table.component.scss']
})
export class AigRoleTableComponent implements OnInit {

    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    constructor() { }

    ngOnInit(): void { }
}
