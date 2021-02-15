import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'aig-entity-reference-list-table',
	templateUrl: './entity-reference-list-table.component.html',
	styleUrls: ['./entity-reference-list-table.component.scss']
})
export class AigEntityReferenceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
	error: any;
	
	constructor() { }

	ngOnInit(): void { }
}
