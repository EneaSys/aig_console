import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { ContextUserDTO, ContextUserResourceService, ObjectReferenceDTO, ObjectReferenceResourceService, TypeCategoryReferenceDTO, TypeCategoryReferenceResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigContextUserNewUpdateModalComponent } from "../context-user-new-update-modal/context-user-new-update-modal.component";
import { AigObjectReferenceNewUpdateDialogComponent } from "../object-reference-new-update-dialog/object-reference-new-update-dialog.component";
import { AigTypeCategoryReferenceNewUpdateDialogComponent } from "../type-category-reference-new-update-dialog/type-category-reference-new-update-dialog.component";

@Component({
    selector: 'aig-type-category-reference-detail-page',
    templateUrl: './type-category-reference-detail-page.component.html',
    styleUrls: ['./type-category-reference-detail-page.component.scss']
})
export class AigTypeCategoryReferenceDetailPageComponent extends GenericComponent {
   
    constructor(
        private typeCategoryReferenceResourceService: TypeCategoryReferenceResourceService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    typeCategoryReferenceDTO: TypeCategoryReferenceDTO

    loadPage() {
        this.typeCategoryReferenceDTO = this.route.snapshot.data.typeCategoryReference;
    }

    async reloadPage() {
        this.typeCategoryReferenceDTO = await this.typeCategoryReferenceResourceService.getTypeCategoryReferenceUsingGET(this.typeCategoryReferenceDTO.id).toPromise();
    }

    async deleteTypeCategoryReference(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.typeCategoryReferenceResourceService.deleteTypeCategoryReferenceUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Type Category Reference: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/m8t', 'type-category-reference']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Type Category Reference: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editTypeCategoryReference(typeCategoryReferenceDTO: TypeCategoryReferenceDTO) {

        this.dialog.open(AigTypeCategoryReferenceNewUpdateDialogComponent, { data: {typeCategoryReference: typeCategoryReferenceDTO }});
    }

}