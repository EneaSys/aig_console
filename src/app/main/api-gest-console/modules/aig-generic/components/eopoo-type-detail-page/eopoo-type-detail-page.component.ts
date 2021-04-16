import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EopooTypeDTO, EopooTypeResourceService } from 'aig-generic';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigEopooTypeNewUpdateModalComponent } from '../eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './eopoo-type-detail-page.component.html',
    styleUrls: ['./eopoo-type-detail-page.component.scss']
})
export class AigEopooTypeDetailPageComponent extends GenericComponent {
    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private eopooTypeResourceService: EopooTypeResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    eopooTypeDTO: EopooTypeDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.eopooTypeDTO = this.route.snapshot.data.eopooType;
        } else {
            this.eopooTypeDTO = await this.eopooTypeResourceService.getEopooTypeUsingGET(this.eopooTypeDTO.id).toPromise();
        }
    }

    editEopooType(eopooTypeDTO: EopooTypeDTO) {
        this.dialog.open(AigEopooTypeNewUpdateModalComponent, { data: { eopooType: eopooTypeDTO } });
    }

    async deleteEopooType(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.eopooTypeResourceService.deleteEopooTypeUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Eopoo type: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/g5c', 'eopoo-type']);
        } catch (e) {
            this._snackBar.open(`Error during deleting eopoo type: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
}
