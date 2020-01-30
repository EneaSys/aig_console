import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CpvDTO, CpvResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './cpv-detail-page.component.html',
    styleUrls: ['./cpv-detail-page.component.scss']
})
export class AigCpvDetailPageComponent extends GenericComponent {
    constructor(
        private cpvResourceService: CpvResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    cpvDTO: CpvDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.cpvDTO = this.route.snapshot.data.cpvDTO;
        } else {
            this.cpvDTO = await this.cpvResourceService.getCpvUsingGET(this.cpvDTO.id).toPromise();
        }
    }
}
