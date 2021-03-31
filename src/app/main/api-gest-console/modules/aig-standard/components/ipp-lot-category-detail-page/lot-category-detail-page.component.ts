import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotCategoryResourceService } from 'aig-standard';

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

        private ippLotCategoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippLotCategoryDTO: ItalianPublicProcurementLotCategoryDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippLotCategoryDTO = this.route.snapshot.data.ippCategory;
        } else {
            this.ippLotCategoryDTO = await this.ippLotCategoryResourceService.getItalianPublicProcurementLotCategoryUsingGET(this.ippLotCategoryDTO.id).toPromise();
        }
    }

    async deleteIppLotCategory(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.ippLotCategoryResourceService.deleteItalianPublicProcurementLotCategoryUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Ipp Lot Category: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'ipp-lot-category']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Ipp Lot Category: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editIppLotCategory(ippLotCategoryDTO: ItalianPublicProcurementLotCategoryDTO) {
        this.dialog.open(AigLotCategoryNewUpdateModalComponent, { data: { ippLotCategory: ippLotCategoryDTO } });
    }

}
