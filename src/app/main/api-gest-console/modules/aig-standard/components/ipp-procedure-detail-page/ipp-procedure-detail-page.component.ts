import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementProcedureDTO } from 'aig-standard';
import { AigIppProcedureNewUpdateModalComponent } from '../ipp-procedure-new-update-modal/ipp-procedure-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    templateUrl: './ipp-procedure-detail-page.component.html',
    styleUrls: ['./ipp-procedure-detail-page.component.scss']
})
export class AigIppProcedureDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private ippProcedureResourceService: ItalianPublicProcurementProcedureResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippProcedure: ItalianPublicProcurementProcedureDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            console.log(this.ippProcedure)
            this.ippProcedure = this.route.snapshot.data.ippProcedure;
        } else {
            this.ippProcedure = await this.ippProcedureResourceService.getItalianPublicProcurementProcedureUsingGET(this.ippProcedure.id).toPromise();
        }
    }

    async deleteIppProcedure(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.ippProcedureResourceService.deleteItalianPublicProcurementProcedureUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Ipp Procedure: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'ipp-procedure']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Ipp Procedure: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    

    editIppProcedureDTO(ippProcedure: ItalianPublicProcurementProcedureDTO) {
        this.dialog.open(AigIppProcedureNewUpdateModalComponent, { data: { ippProcedure: ippProcedure } });
    }

}
