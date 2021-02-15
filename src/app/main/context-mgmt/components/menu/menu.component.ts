import { Component, OnInit } from '@angular/core';
import { contextNavigation } from './navigation/navigation';

@Component({
	selector: 'aig-context-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class AigMenuContextComponent implements OnInit {
	public navigation = contextNavigation;
	
	constructor() { }

	ngOnInit(): void { }
}
