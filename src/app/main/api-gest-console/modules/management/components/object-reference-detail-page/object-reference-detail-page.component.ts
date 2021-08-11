import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { ContextUserDTO, ContextUserResourceService, ObjectReferenceDTO, ObjectReferenceResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigContextUserNewUpdateModalComponent } from "../context-user-new-update-modal/context-user-new-update-modal.component";
import { AigObjectReferenceNewUpdateDialogComponent } from "../object-reference-new-update-dialog/object-reference-new-update-dialog.component";

@Component({
    selector: 'aig-object-reference-detail-page',
    templateUrl: './object-reference-detail-page.component.html',
    styleUrls: ['./object-reference-detail-page.component.scss']
})
export class AigObjectReferenceDetailPageComponent extends GenericComponent {
   
    constructor(
        private objectReferenceResourceService: ObjectReferenceResourceService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    objectReferenceDTO: ObjectReferenceDTO

    loadPage() {
        this.objectReferenceDTO = this.route.snapshot.data.objectReference;
    }

    async reloadPage() {
        this.objectReferenceDTO = await this.objectReferenceResourceService.getObjectReferenceUsingGET(this.objectReferenceDTO.id).toPromise();
    }

    async deleteObjectReference(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.objectReferenceResourceService.deleteObjectReferenceUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Object Reference: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/m8t', 'object-reference']);
        } catch (e) {
            this._snackBar.open(`Error during deleting object Reference: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editObjectReference(objectReferenceDTO: ObjectReferenceDTO) {

        this.dialog.open(AigObjectReferenceNewUpdateDialogComponent, { data: { objectReference: objectReferenceDTO }});
    }

}