import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-social-actiopn-list-table',
    templateUrl: './social-action-list-table.component.html',
    styleUrls: ['./social-action-list-table.component.scss']
})
export class AigSocialActionListTableComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

}
