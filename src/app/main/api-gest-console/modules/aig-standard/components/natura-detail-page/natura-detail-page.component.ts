import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SocialActionResourceService, SocialActionDTO, NaturaResourceService, NaturaDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigSocialActionNewUpdateModalComponent } from '../social-action-new-update-modal/social-action-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigNaturaNewUpdateDialogComponent } from '../natura-new-update-dialog/natura-new-update-dialog.component';

@Component({
    templateUrl: './natura-detail-page.component.html',
    styleUrls: ['./natura-detail-page.component.scss']
})
export class AigNaturaDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private naturaResourceService: NaturaResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    natura: NaturaDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.natura = this.route.snapshot.data.natura;
        } else {
            this.natura = await this.naturaResourceService.getNaturaUsingGET(this.natura.id).toPromise();
        }
    }

    async deleteNatura(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.naturaResourceService.deleteNaturaUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Natura: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'natura']);
        } catch (e) {
            this._snackBar.open(`Error during deleting natura: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editNatura(natura: NaturaDTO) {
        this.dialog.open(AigNaturaNewUpdateDialogComponent, { data: { natura: natura } });
    }

}