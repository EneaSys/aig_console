import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ItalianPublicProcurementLotTypeDTO, ItalianPublicProcurementLotTypeResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigIppLotTypeNewUpdateModalComponent } from '../ipp-lot-type-new-update-modal/ipp-lot-type-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    templateUrl: './ipp-lot-type-detail-page.component.html',
    styleUrls: ['./ipp-lot-type-detail-page.component.scss']
})
export class AigIppLotTypeDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private ippLotTypeResourceService: ItalianPublicProcurementLotTypeResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippLotType: ItalianPublicProcurementLotTypeDTO;
    
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippLotType = this.route.snapshot.data.ippLotType;
        } else {
            this.ippLotType = await this.ippLotTypeResourceService.getItalianPublicProcurementLotTypeUsingGET(this.ippLotType.id).toPromise();
        }
    }

    async deleteIppLotType(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.ippLotTypeResourceService.deleteItalianPublicProcurementLotTypeUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Ipp Lot Type: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'ipp lot type']);
        } catch (e) {
            this._snackBar.open(`Error during deleting ipp lot type: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    

    editIppLotType(ippLotType: ItalianPublicProcurementLotTypeDTO) {
        this.dialog.open(AigIppLotTypeNewUpdateModalComponent, { data: { ippLotType: ippLotType } });
    }

}
