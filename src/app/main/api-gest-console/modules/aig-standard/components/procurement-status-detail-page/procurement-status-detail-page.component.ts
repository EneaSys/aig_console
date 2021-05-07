import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import {  IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigProcurementStatusNewUpdateDialogComponent } from '../procurement-status-new-update-dialog/procurement-status-new-update-dialog.component';


@Component({
    templateUrl: './procurement-status-detail-page.component.html',
    styleUrls: ['./procurement-status-detail-page.component.scss']
})
export class AigProcurementStatusDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
      
        private procurementStatusResourceService: IlPpProcurementStatusResourceService,
        private route: ActivatedRoute,
        private dialog : MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    procurementStatusDTO: IlPpProcurementStatusDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.procurementStatusDTO = this.route.snapshot.data.procurementStatus;
        } else {
            this.procurementStatusDTO = await this.procurementStatusResourceService.getIlPpProcurementStatusUsingGET(this.procurementStatusDTO.id).toPromise();
        }
    }

    async deleteProcurementStatus(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.procurementStatusResourceService.deleteIlPpProcurementStatusUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Procurement Status: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'procurement-status']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Procurement Status: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editProcurementStatus(procurementStatusDTO: IlPpProcurementStatusDTO) {
        this.dialog.open(AigProcurementStatusNewUpdateDialogComponent, { data: { procurementStatus: procurementStatusDTO } });
    }

}
