import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AwardCriterionResourceService, AwardCriterionDTO  } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigAwardCriterionNewUpdateDialogComponent } from '../award-criterion-new-update-dialog/award-criterion-new-update-dialog.component';

@Component({
    templateUrl: './award-criterion-detail-page.component.html',
    styleUrls: ['./award-criterion-detail-page.component.scss']
})
export class AigAwardCriterionDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
      
        private awardCriterionResourceService: AwardCriterionResourceService,
        private route: ActivatedRoute,
        private dialog : MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    awardCriterionDTO: AwardCriterionDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.awardCriterionDTO = this.route.snapshot.data.awardCriterion;
        } else {
            this.awardCriterionDTO = await this.awardCriterionResourceService.getAwardCriterionUsingGET(this.awardCriterionDTO.id).toPromise();
        }
    }

    async deleteAwardCriterion(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.awardCriterionResourceService.deleteAwardCriterionUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Award Criterion: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'award-criterion']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Award Criterion: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editAwardCriterion(awardCriterionDTO: AwardCriterionDTO) {
        this.dialog.open(AigAwardCriterionNewUpdateDialogComponent, { data: { awardCriterion: awardCriterionDTO } });
    }

}
