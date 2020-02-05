import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialResourceService, SocialDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AigSocialDialogComponent } from '../social-dialog/social-dialog.component';

@Component({
    templateUrl: './social-list-page.component.html',
    styleUrls: ['./social-list-page.component.scss']
})
export class AigSocialListPageComponent extends GenericComponent {
    constructor(
        private socialResourceService: SocialResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['id', 'code', 'name', 'wikiCode', 'buttons'];
    
    socialDTOs: SocialDTO[];

    async loadComponent() {
        this.socialDTOs = await this.socialResourceService.getAllSocialsUsingGET().toPromise();
    }

    newSocial(): void {
        this.dialog.open(AigSocialDialogComponent, { data: { social: {} } });
    }
}