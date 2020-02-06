import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EopooTypeDTO, EopooTypeResourceService } from 'aig-generic';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigEopooTypeNewUpdateModalComponent } from '../eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';

@Component({
    templateUrl: './eopoo-type-detail-page.component.html',
    styleUrls: ['./eopoo-type-detail-page.component.scss']
})
export class AigEopooTypeDetailPageComponent extends GenericComponent {
    constructor(
        private eopooTypeResourceService: EopooTypeResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
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
}
