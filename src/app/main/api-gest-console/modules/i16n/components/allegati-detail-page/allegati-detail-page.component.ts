import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AllegatiResourceService, AllegatiDTO } from 'aig-italianlegislation';
import { AigAllegatiNewUpdateDialogComponent } from '../allegati-new-update-dialog/allegati-new-update-dialog.component';

@Component({
    templateUrl: './allegati-detail-page.component.html',
    styleUrls: ['./allegati-detail-page.component.scss']
})
export class AigAllegatiDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private allegatiResourceService: AllegatiResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


        allegati: AllegatiDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.allegati = this.route.snapshot.data.allegati;
        } else {
            this.allegati = await this.allegatiResourceService.getAllegatiUsingGET(this.allegati.id).toPromise();
        }
    }

    async deleteAllegati(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.allegatiResourceService.deleteAllegatiUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Allegati: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/i16n', 'allegati']);
        } catch (e) {
            this._snackBar.open(`Error during deleting allegati: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editAllegati(allegati: AllegatiDTO) {
        this.dialog.open(AigAllegatiNewUpdateDialogComponent, { data: { allegati: allegati } });
    }

}