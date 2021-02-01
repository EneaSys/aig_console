import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aig-producer-list-table',
    templateUrl: './producer-list-table.component.html',
    styleUrls: ['./producer-list-table.component.scss']
})
export class AigProducerListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor() { }

    ngOnInit(): void { }
}
