import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'aig-personalization-list-table',
    templateUrl: './personalization-list-table.component.html',
    styleUrls: ['./personalization-list-table.component.scss'],
})
export class AigPersonalizationListTableComponent implements OnInit {
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