import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
	templateUrl: './buyer-list-page.component.html',
	styleUrls: ['./buyer-list-page.component.scss']
})
export class AigBuyerListPageComponent extends GenericComponent {
	constructor(
        
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	async loadComponent() {
		
	}
}
