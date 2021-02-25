import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContextModuleNewUpdateModalComponent } from '../context-module-new-update-modal/context-module-new-update-modal.component';
import { ContextModuleDTO, ContextModuleResourceService } from 'aig-management';

@Component({
    selector: 'aig-context-module-detail-page',
    templateUrl: './context-module-detail-page.component.html',
    styleUrls: ['./context-module-detail-page.component.scss']
})
export class AigContextModuleDetailPageComponent extends GenericComponent {
   
    constructor(
        private contextModuleResourceService: ContextModuleResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    contextModuleDTO: ContextModuleDTO

    loadPage() {
        this.contextModuleDTO = this.route.snapshot.data.contextModule;
    }

    async reloadPage() {
        this.contextModuleDTO = await this.contextModuleResourceService.getContextModuleUsingGET(this.contextModuleDTO.id).toPromise();
    }

    editContextModule(contextModuleDTO: ContextModuleDTO) {

        this.dialog.open(AigContextModuleNewUpdateModalComponent, { data: { contextModule: contextModuleDTO }});
    }

}