import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigSocialActionDialogComponent } from '../social-action-dialog/social-action-dialog.component';

@Component({
    templateUrl: './social-action-list-page.component.html',
    styleUrls: ['./social-action-list-page.component.scss']
})
export class AigSocialActionListPageComponent extends GenericComponent {
    constructor(
        private socialActionResourceService: SocialActionResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['id', 'code', 'name','wikiCode', 'buttons'];
    socialActionDTOs: SocialActionDTO[];

    async loadComponent() {
        this.socialActionDTOs = await this.socialActionResourceService.getAllSocialActionsUsingGET().toPromise();
    }

    newAction(){
        this.dialog.open(AigSocialActionDialogComponent);
    }
}