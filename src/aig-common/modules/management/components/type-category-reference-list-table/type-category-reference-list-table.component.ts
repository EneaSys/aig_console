import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextUserDTO, ContextUserResourceService, ObjectReferenceDTO, ObjectReferenceResourceService, TypeCategoryReferenceDTO, TypeCategoryReferenceResourceService } from 'aig-management';
import { AigContextUserNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/context-user-new-update-modal/context-user-new-update-modal.component';
import { AigObjectReferenceNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/management/components/object-reference-new-update-dialog/object-reference-new-update-dialog.component';
import { AigTypeCategoryReferenceNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/management/components/type-category-reference-new-update-dialog/type-category-reference-new-update-dialog.component';


@Component({
    selector: 'aig-type-category-reference-list-table',
    templateUrl: './type-category-reference-list-table.component.html',
    styleUrls: ['./type-category-reference-list-table.component.scss'],
})
export class AigTypeCategoryReferenceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private typeCategoryReferenceResourceService: TypeCategoryReferenceResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ){ }

    ngOnInit(): void {}

    async deleteTypeCategoryReference(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.typeCategoryReferenceResourceService.deleteTypeCategoryReferenceUsingDELETE(id).toPromise();
            this._snackBar.open(`TypeCategoryReference: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting TypeCategoryReference: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editTypeCategoryReference(typeCategoryReferenceDTO: TypeCategoryReferenceDTO) {
        this.dialog.open(AigTypeCategoryReferenceNewUpdateDialogComponent, { data: { typeCategoryReference: typeCategoryReferenceDTO } });
    }

}