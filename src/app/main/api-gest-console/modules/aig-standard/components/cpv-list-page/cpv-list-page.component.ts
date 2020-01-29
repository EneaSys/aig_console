import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CpvDTO, CpvResourceService } from 'aig-standard';

@Component({
    templateUrl: './cpv-list-page.component.html',
    styleUrls: ['./cpv-list-page.component.scss']
})
export class AigCpvListPageComponent extends GenericComponent {
    constructor(
        private cpvResourceService: CpvResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    cpvs: CpvDTO[];

    async loadComponent() {
        this.cpvs = await this.cpvResourceService.getAllCpvsUsingGET().toPromise();
    }
}
