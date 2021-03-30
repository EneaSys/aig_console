import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { ContextUserDTO, ContextUserResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigContextUserNewUpdateModalComponent } from "../context-user-new-update-modal/context-user-new-update-modal.component";

@Component({
    selector: 'aig-context-user-detail-page',
    templateUrl: './context-user-detail-page.component.html',
    styleUrls: ['./context-user-detail-page.component.scss']
})
export class AigContextUserDetailPageComponent extends GenericComponent {
   
    constructor(
        private contextUserResourceService: ContextUserResourceService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    contextUserDTO: ContextUserDTO

    loadPage() {
        this.contextUserDTO = this.route.snapshot.data.contextUser;
    }

    async reloadPage() {
        this.contextUserDTO = await this.contextUserResourceService.getContextUserUsingGET(this.contextUserDTO.id).toPromise();
    }

    async deleteContextUser(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.contextUserResourceService.deleteContextUserUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Context User: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/m8t', 'context-user']);
        } catch (e) {
            this._snackBar.open(`Error during deleting context User: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editContextUser(contextUserDTO: ContextUserDTO) {

        this.dialog.open(AigContextUserNewUpdateModalComponent, { data: { contextUser: contextUserDTO }});
    }

}