import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'aig-tenant-context-list-table',
	templateUrl: './tenant-context-list-table.component.html',
	styleUrls: ['./tenant-context-list-table.component.scss']
})
export class AigTenantContextListTableComponent implements OnInit {
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
