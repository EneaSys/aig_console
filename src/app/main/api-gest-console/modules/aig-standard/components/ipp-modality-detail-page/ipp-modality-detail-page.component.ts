import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IlPpProcurementModalityDTO, IlPpProcurementModalityResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigIppModalityNewUpdateModalComponent } from '../ipp-modality-new-update-modal/ipp-modality-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    templateUrl: './ipp-modality-detail-page.component.html',
    styleUrls: ['./ipp-modality-detail-page.component.scss']
})
export class AigIppModalityDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
      
        private ippModalityResourceService: IlPpProcurementModalityResourceService,
        private route: ActivatedRoute,
        private dialog : MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippModalityDTO: IlPpProcurementModalityDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippModalityDTO = this.route.snapshot.data.ippModality;
        } else {
            this.ippModalityDTO = await this.ippModalityResourceService.getIlPpProcurementModalityUsingGET(this.ippModalityDTO.id).toPromise();
        }
    }

    async deleteIppModality(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.ippModalityResourceService.deleteIlPpProcurementModalityUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Ipp Modality: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'ipp-modality']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Ipp Modality: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editIppModality(ippModalityDTO: IlPpProcurementModalityDTO) {
        this.dialog.open(AigIppModalityNewUpdateModalComponent, { data: { ippModality: ippModalityDTO } });
    }

}
