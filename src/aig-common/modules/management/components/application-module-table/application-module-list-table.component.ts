import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-application-module-list-table',
    templateUrl: './application-module-list-table.component.html',
    styleUrls: ['./application-module-list-table.component.scss']
})
export class AigApplicationModuleListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }
}
