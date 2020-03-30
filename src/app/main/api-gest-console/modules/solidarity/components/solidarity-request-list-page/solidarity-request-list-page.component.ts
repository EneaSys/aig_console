import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigSolidarityRequestNewDialogComponent } from '../solidarity-request-new-dialog/solidarity-request-new-dialog.component';


@Component({
    templateUrl: './solidarity-request-list-page.component.html',
    styleUrls: ['./solidarity-request-list-page.component.scss']
})
export class AigSolidarityRequestListPageComponent extends GenericComponent {
    constructor(
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    async loadComponent() {

    }

    newSolidarityRequest() {
        this.dialog.open(AigSolidarityRequestNewDialogComponent);
    }
}
