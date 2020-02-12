import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-social-list-table',
    templateUrl: './social-list-table.component.html',
    styleUrls: ['./social-list-table.component.scss']
})
export class AigSocialListTableComponent implements OnInit {
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
