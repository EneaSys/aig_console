import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
	
	constructor(
		private router: Router,
	) { }

	ngOnInit(): void { }
}
