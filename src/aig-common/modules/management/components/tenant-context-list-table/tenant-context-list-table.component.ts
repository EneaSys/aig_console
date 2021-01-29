import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'aig-tenant-context-list-table',
	templateUrl: './tenant-context-list-table.component.html',
	styleUrls: ['./tenant-context-list-table.component.scss']
})
export class AigTenantContextListTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
	error: any;
	
	constructor() { }

	ngOnInit(): void { }
}
