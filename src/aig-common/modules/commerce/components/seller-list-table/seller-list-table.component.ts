import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
    
    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { }
}
