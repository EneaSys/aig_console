import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
// import { AigAssociateRoleToPermissionDialogComponent } from '../associate-role-premission-dialog/associate-role-premission-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';

@Component({
    templateUrl: './social-action-detail.component.html',
    styleUrls: ['./social-action-detail.component.scss']
})
export class AigSocialActionDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private socialActionResourceService: SocialActionResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    // socialdisplayedColumns: string[] = ['id', 'name', 'code', 'buttons'];

    socialActionDTO: SocialActionDTO;
    
    loadComponent(): void {
        this.socialActionDTO = this.route.snapshot.data.social;
    }
}
