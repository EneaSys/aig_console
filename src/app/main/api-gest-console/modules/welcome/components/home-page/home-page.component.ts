import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GenericComponent } from '../../../../generic-component/generic-component';
import { AigGenericComponentService } from '../../../../generic-component/generic-component.service';

@Component({
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class AigHomePageComponent extends GenericComponent {
    constructor(
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		
	}
}
