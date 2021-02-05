import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-payment-list-table',
    templateUrl: './payment-list-table.component.html',
    styleUrls: ['./payment-list-table.component.scss']
})
export class AigPaymentListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}
