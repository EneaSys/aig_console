import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IlPpPartecipationTypeDTO, IlPpPartecipationTypeResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigPartecipationTypeNewUpdateDialogComponent } from '../partecipation-type-new-update-dialog/partecipation-type-new-update-dialog.component';

@Component({
    templateUrl: './partecipation-type-detail-page.component.html',
    styleUrls: ['./partecipation-type-detail-page.component.scss']
})
export class AigPartecipationTypeDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
      
        private partecipationTypeResourceService: IlPpPartecipationTypeResourceService,
        private route: ActivatedRoute,
        private dialog : MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    partecipationTypeDTO: IlPpPartecipationTypeDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.partecipationTypeDTO = this.route.snapshot.data.partecipationType;
        } else {
            this.partecipationTypeDTO = await this.partecipationTypeResourceService.getIlPpPartecipationTypeUsingGET(this.partecipationTypeDTO.id).toPromise();
        }
    }

    async deletePartecipationType(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.partecipationTypeResourceService.deleteIlPpPartecipationTypeUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Partecipation Type: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'partecipation-type']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Partecipation Type: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editPartecipationType(partecipationTypeDTO: IlPpPartecipationTypeDTO) {
        this.dialog.open(AigPartecipationTypeNewUpdateDialogComponent, { data: { partecipationType: partecipationTypeDTO } });
    }

}
