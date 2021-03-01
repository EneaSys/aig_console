import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-application-module-list-table',
    templateUrl: './application-module-list-table.component.html',
    styleUrls: ['./application-module-list-table.component.scss']
})
export class AigApplicationModuleListTableComponent implements OnInit {
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
