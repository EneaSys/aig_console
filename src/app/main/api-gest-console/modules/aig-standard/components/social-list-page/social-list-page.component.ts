import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialResourceService, SocialActionDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigSocialDialogComponent } from "../social-dialog/social-dialog.component";
import { Observable } from 'rxjs';

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

    displayedColumns: string[] = ['id', 'code', 'name', 'buttons'];
    
    // socialActionDTOs: SocialActionDTO[];

    socialDataSource: Observable<SocialActionDTO[]>;

    // async loadComponent() {
    //     console.log(this.socialResourceService);
    //     this.socialActionDTOs = await this.socialResourceService.getAllSocialsUsingGET().toPromise();
    //     console.log(this.socialActionDTOs);
    // }

    loadComponent(): void {
        this.socialDataSource = this.socialResourceService.getAllSocialsUsingGET();
        console.log(this.socialDataSource);
    }

    newRole(): void {
        this.dialog.open(AigSocialDialogComponent);
    }
}