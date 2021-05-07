import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import {  IlPpProcurementLotStatusDTO, IlPpProcurementLotStatusResourceService, IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigProcurementStatusNewUpdateDialogComponent } from '../procurement-status-new-update-dialog/procurement-status-new-update-dialog.component';
import { AigProcurementLotStatusNewUpdateDialogComponent } from '../procurement-lot-status-new-update-dialog/procurement-lot-status-new-update-dialog.component';


@Component({
    templateUrl: './procurement-lot-status-detail-page.component.html',
    styleUrls: ['./procurement-lot-status-detail-page.component.scss']
})
export class AigProcurementLotStatusDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
      
        private procurementLotStatusResourceService: IlPpProcurementLotStatusResourceService,
        private route: ActivatedRoute,
        private dialog : MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    procurementLotStatusDTO: IlPpProcurementLotStatusDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.procurementLotStatusDTO = this.route.snapshot.data.procurementLotStatus;
        } else {
            this.procurementLotStatusDTO = await this.procurementLotStatusResourceService.getIlPpProcurementLotStatusUsingGET(this.procurementLotStatusDTO.id).toPromise();
        }
    }

    async deleteProcurementLotStatus(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.procurementLotStatusResourceService.deleteIlPpProcurementLotStatusUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Procurement  Lot Status: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'procurement-lot-status']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Procurement Lot Status: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editProcurementLotStatus(procurementLotStatusDTO: IlPpProcurementLotStatusDTO) {
        this.dialog.open(AigProcurementLotStatusNewUpdateDialogComponent, { data: { procurementLotStatus: procurementLotStatusDTO } });
    }

}
