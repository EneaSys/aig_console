import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { IlFeRegimeFiscaleDTO, IlFeRegimeFiscaleResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { AigRegimeFiscaleNewUpdateFormComponent } from 'aig-common/modules/standard/components/regime-fiscale-new-update-form/regime-fiscale-new-update-form.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigRegimeFiscaleNewUpdateDialogComponent } from '../regime-fiscale-new-update-dialog/regime-fiscale-new-update-dialog.component';

@Component({
    templateUrl: './regime-fiscale-detail-page.component.html',
    styleUrls: ['./regime-fiscale-detail-page.component.scss']
})
export class AigRegimeFiscaleDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private regimeFiscaleResourceService: IlFeRegimeFiscaleResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    regimeFiscale: IlFeRegimeFiscaleDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.regimeFiscale = this.route.snapshot.data.regimeFiscale;
        } else {
            this.regimeFiscale = await this.regimeFiscaleResourceService.getIlFeRegimeFiscaleUsingGET(this.regimeFiscale.id).toPromise();
        }
    }

    async deleteRegimeFiscale(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.regimeFiscaleResourceService.deleteIlFeRegimeFiscaleUsingDELETE(id).toPromise();

            this._snackBar.open(`Regime Fiscale: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/s6d', 'regime-fiscale']);
        } catch (e) {
            this._snackBar.open(`Error during deleting regime fiscale: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editRegimeFiscale(regimeFiscale: IlFeRegimeFiscaleDTO) {
        this.dialog.open(AigRegimeFiscaleNewUpdateDialogComponent, { data: { regimeFiscale: regimeFiscale} });
    }

}