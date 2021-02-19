import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-buyer-list-table',
    templateUrl: './buyer-list-table.component.html',
    styleUrls: ['./buyer-list-table.component.scss']
})
export class AigBuyerListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { }
}
