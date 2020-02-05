import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EopooResourceService, EopooDTO } from 'aig-generic';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';


@Component({
    templateUrl: './eopoo-detail-page.component.html',
    styleUrls: ['./eopoo-detail-page.component.scss']
})
export class AigEopooDetailPageComponent extends GenericComponent {
    constructor(
        private eopooResourceService: EopooResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    eopooDTO: EopooDTO;

    loadPage() {
        this.eopooDTO = this.route.snapshot.data.eopoo;
    }

    async reloadPage() {
        this.eopooDTO = await this.eopooResourceService.getEopooUsingGET(this.eopooDTO.id).toPromise();
    }

    editEopoo(eopooDTO: EopooDTO) {
        this.dialog.open(AigEopooNewModalComponent, { data: { eopoo: eopooDTO } });
    }
}
