import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CpvDTO, CpvResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCpvNewUpdateModalComponent } from '../cpv-new-update-modal/cpv-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({    
    templateUrl: './cpv-detail-page.component.html',
    styleUrls: ['./cpv-detail-page.component.scss']
})
export class AigCpvDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private cpvResourceService: CpvResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    cpvDTO: CpvDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.cpvDTO = this.route.snapshot.data.cpv;
        } else {
            this.cpvDTO = await this.cpvResourceService.getCpvUsingGET(this.cpvDTO.id).toPromise();
        }
    }

    async deleteCity(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.cpvResourceService.deleteCpvUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Cpv: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'city']);
        } catch (e) {
            this._snackBar.open(`Error during deleting city: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    

    editCpv(cpvDTO: CpvDTO) {
        this.dialog.open(AigCpvNewUpdateModalComponent, { data: { cpv: cpvDTO } });
    }
}
