import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EopooTypeDTO, EopooTypeResourceService, FormDataDTO, FormDataResourceService } from 'aig-generic';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigEopooTypeNewUpdateModalComponent } from '../eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';
import { AigFormDataNewUpdateDialogComponent } from '../form-data-new-update-dialog/form-data-new-update-dialog.component';

@Component({
    templateUrl: './form-data-detail-page.component.html',
    styleUrls: ['./form-data-detail-page.component.scss']
})
export class AigFormDataDetailPageComponent extends GenericComponent {
    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private formDataResourceService: FormDataResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    formDataDTO: FormDataDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.formDataDTO = this.route.snapshot.data.formData;
        } else {
            this.formDataDTO = await this.formDataResourceService.getFormDataUsingGET(this.formDataDTO.id).toPromise();
        }
    }

    editFormData(formDataDTO: FormDataDTO) {
        this.dialog.open(AigFormDataNewUpdateDialogComponent, { data: { formData: formDataDTO } });
    }

    async deleteFormData(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.formDataResourceService.deleteFormDataUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Form data: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/g5c', 'form-data']);
        } catch (e) {
            this._snackBar.open(`Error during deleting form data: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
}
