import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ReferentDTO, ReferentResourceService } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigReferentNewUpdateDialogComponent } from '../referent-new-update-dialog/referent-new-update-dialog.component';

@Component({
    templateUrl: './referent-detail-page.component.html',
    styleUrls: ['./referent-detail-page.component.scss']
})
export class AigReferentDetailPageComponent extends GenericComponent {
    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private referentResourceService: ReferentResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    referentDTO: ReferentDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.referentDTO = this.route.snapshot.data.referent;
        } else {
            this.referentDTO = await this.referentResourceService.getReferentUsingGET(this.referentDTO.id).toPromise();
        }
    }

    editReferent(referentDTO: ReferentDTO) {
        this.dialog.open(AigReferentNewUpdateDialogComponent, { data: { referent: referentDTO } });
    }

    async deleteReferent(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.referentResourceService.deleteReferentUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Referent: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/g5c', 'referent']);
        } catch (e) {
            this._snackBar.open(`Error during deleting referent: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
}