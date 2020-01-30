import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-city-list-table',
    templateUrl: './city-list-table.component.html',
    styleUrls: ['./city-list-table.component.scss']
})
export class AigCityListTableComponent implements OnInit {
    constructor() { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
