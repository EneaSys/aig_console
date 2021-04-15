import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import {  RegimeFiscaleResourceService, RegimeFiscaleDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { AigRegimeFiscaleNewUpdateFormComponent } from 'aig-common/modules/standard/components/regime-fiscale-new-update-form/regime-fiscale-new-update-form.component';

@Component({
    templateUrl: './regime-fiscale-detail-page.component.html',
    styleUrls: ['./regime-fiscale-detail-page.component.scss']
})
export class AigRegimeFiscaleDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private regimeFiscaleResourceService: RegimeFiscaleResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    regimeFiscale: RegimeFiscaleDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.regimeFiscale = this.route.snapshot.data.regimeFiscale;
        } else {
            this.regimeFiscale = await this.regimeFiscaleResourceService.getRegimeFiscaleUsingGET(this.regimeFiscale.id).toPromise();
        }
    }

    editRegimeFiscale(regimeFiscale: RegimeFiscaleDTO) {
        this.dialog.open(AigRegimeFiscaleNewUpdateFormComponent, { data: { regimeFiscale: regimeFiscale} });
    }

}