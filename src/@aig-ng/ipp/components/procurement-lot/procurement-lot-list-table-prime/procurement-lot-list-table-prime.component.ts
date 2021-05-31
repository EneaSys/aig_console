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

    totalRecords: number = 0;

    page: number = 0;
    first: number = 0;
    size: number = 10;


    constructor() { }

    selectedElements: any[] = [];

    loadData(event: LazyLoadEvent) {
        console.log(event);
        this.totalRecords = this.ds.length;
        
        this.first = event.first;
        this.page = event.first / event.rows;
        this.size = event.rows;
    }
}