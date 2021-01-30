import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-seller-list-table',
    templateUrl: './seller-list-table.component.html',
    styleUrls: ['./seller-list-table.component.scss']
})
export class AigSellerListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }
}
