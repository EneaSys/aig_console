import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { ContextUserDTO, ContextUserResourceService, FieldReferenceDTO, FieldReferenceResourceService, ObjectReferenceDTO, ObjectReferenceResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigContextUserNewUpdateModalComponent } from "../context-user-new-update-modal/context-user-new-update-modal.component";
import { AigFieldReferenceNewUpdateDialogComponent } from "../field-reference-new-update-dialog/field-reference-new-update-dialog.component";
import { AigObjectReferenceNewUpdateDialogComponent } from "../object-reference-new-update-dialog/object-reference-new-update-dialog.component";

@Component({
    selector: 'aig-field-reference-detail-page',
    templateUrl: './field-reference-detail-page.component.html',
    styleUrls: ['./field-reference-detail-page.component.scss']
})
export class AigFieldReferenceDetailPageComponent extends GenericComponent {
   
    constructor(
        private fieldReferenceResourceService: FieldReferenceResourceService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


        fieldReferenceDTO: FieldReferenceDTO

    loadPage() {
        this.fieldReferenceDTO = this.route.snapshot.data.fieldReference;
    }

    async reloadPage() {
        this.fieldReferenceDTO = await this.fieldReferenceResourceService.getFieldReferenceUsingGET(this.fieldReferenceDTO.id).toPromise();
    }

    async deleteFieldReference(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.fieldReferenceResourceService.deleteFieldReferenceUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Field Reference: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/m8t', 'field-reference']);
        } catch (e) {
            this._snackBar.open(`Error during deleting field Reference: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editFieldReference(fieldReferenceDTO: FieldReferenceDTO) {

        this.dialog.open(AigFieldReferenceNewUpdateDialogComponent, { data: { fieldReference: fieldReferenceDTO }});
    }

}