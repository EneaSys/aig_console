import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'procurement-lot-list-table-prime',
    templateUrl: './procurement-lot-list-table-prime.component.html',
    styleUrls: ['./procurement-lot-list-table-prime.component.scss']
})
export class GleIppProcurementLotListTablePrimeComponent {
    @Input()
    ds: any[];

    constructor() { }

    selectedElements: any[] = [];

    loadData(event: LazyLoadEvent) {
        console.log(event);
    }
}