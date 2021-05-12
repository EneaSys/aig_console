import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IlPpProcurementLotCategoryDTO, IlPpProcurementLotCategoryResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigLotCategoryNewUpdateModalComponent } from '../ipp-lot-category-new-update-modal/lot-category-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    templateUrl: './lot-category-detail-page.component.html',
    styleUrls: ['./lot-category-detail-page.component.scss']
})
export class AigLotCategoryDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,

        private ippLotCategoryResourceService: IlPpProcurementLotCategoryResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippLotCategoryDTO: IlPpProcurementLotCategoryDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippLotCategoryDTO = this.route.snapshot.data.ippCategory;
        } else {
            this.ippLotCategoryDTO = await this.ippLotCategoryResourceService.getIlPpProcurementLotCategoryUsingGET(this.ippLotCategoryDTO.id).toPromise();
        }
    }

    async deleteIppLotCategory(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.ippLotCategoryResourceService.deleteIlPpProcurementLotCategoryUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Ipp Lot Category: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'ipp-lot-category']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Ipp Lot Category: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editIppLotCategory(ippLotCategoryDTO: IlPpProcurementLotCategoryDTO) {
        this.dialog.open(AigLotCategoryNewUpdateModalComponent, { data: { ippLotCategory: ippLotCategoryDTO } });
    }

}
