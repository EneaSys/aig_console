import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-social-actiopn-list-table',
    templateUrl: './social-action-list-table.component.html',
    styleUrls: ['./social-action-list-table.component.scss']
})
export class AigSocialActionListTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { }

}
