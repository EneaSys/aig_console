import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IlPpProcurementSectorDTO, IlPpProcurementSectorResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigIppSectorNewUpdateModalComponent } from '../ipp-sector-new-update-modal/ipp-sector-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    templateUrl: './ipp-sector-detail-page.component.html',
    styleUrls: ['./ipp-sector-detail-page.component.scss']
})
export class AigIppSectorDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,

        private ippSectorResourceService: IlPpProcurementSectorResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippSector: IlPpProcurementSectorDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippSector = this.route.snapshot.data.ippSector;
        } else {
            this.ippSector = await this.ippSectorResourceService.getIlPpProcurementSectorUsingGET(this.ippSector.id).toPromise();
        }
    }

    async deleteIppSector(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.ippSectorResourceService.deleteIlPpProcurementSectorUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Ipp Sector: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'ipp-sector']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Ipp Sector: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editIppSector(ippSector: IlPpProcurementSectorDTO) {
        this.dialog.open(AigIppSectorNewUpdateModalComponent, { data: { ippSector: ippSector } });
    }

}
