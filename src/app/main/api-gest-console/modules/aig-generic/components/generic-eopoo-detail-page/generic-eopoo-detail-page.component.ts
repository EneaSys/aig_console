import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { GenericEopooDTO } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigGenericEopooNewUpdateDialogComponent } from '../generic-eopoo-new-update-dialog/generic-eopoo-new-update-dialog.component';

@Component({
    templateUrl: './generic-eopoo-detail-page.component.html',
    styleUrls: ['./generic-eopoo-detail-page.component.scss']
})
export class GenericEopooDetailPageComponent extends GenericComponent {
    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        /*private genericEopooResourceService: GenericEopooResourceService,*/
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    genericEopooDTO: GenericEopooDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.genericEopooDTO = this.route.snapshot.data.genericEopoo;
        } else {
            /*this.genericEopooDTO = await this.genericEopooResourceService.getGenericEopooUsingGET(this.genericEopooDTO.id).toPromise();*/
        }
    }

    editGenericEopoo(genericEopooDTO: GenericEopooDTO) {
        this.dialog.open(AigGenericEopooNewUpdateDialogComponent, { data: { genericEopoo: genericEopooDTO } });
    }

    async deleteGenericEopoo(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            /*await this.genericEopooResourceService.deleteGenericEopooUsingDELETE(id).toPromise();*/
    
            this._snackBar.open(`Generic Eopoo: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/g5c', 'generic-eopoo']);
        } catch (e) {
            this._snackBar.open(`Error during deleting generic Eopoo: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
}