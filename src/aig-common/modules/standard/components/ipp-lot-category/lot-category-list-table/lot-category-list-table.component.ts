import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-lot-category-list-table',
    templateUrl: './lot-category-list-table.component.html',
    styleUrls: ['./lot-category-list-table.component.scss']
})
export class AigLotCategoryListTableComponent implements OnInit {
    constructor() { }
    @Input() 
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
