import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { ContextUserDTO, ContextUserResourceService } from "api-gest";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigContextUserNewUpdateModalComponent } from "../context-user-new-update-modal/context-user-new-update-modal.component";

@Component({
    selector: 'aig-context-user-detail-page',
    templateUrl: './context-module-user-page.component.html',
    styleUrls: ['./context-module-user-page.component.scss']
})
export class AigContextUserDetailPageComponent extends GenericComponent {
   
    constructor(
        private contextUserResourceService: ContextUserResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    contextUserDTO: ContextUserDTO

    loadPage() {
        this.contextUserDTO = this.route.snapshot.data.contextUser;
    }

    async reloadPage() {
        this.contextUserDTO = await this.contextUserResourceService.getContextUserUsingGET(this.contextUserDTO.id).toPromise();
    }

    editContextUser(contextUserDTO: ContextUserDTO) {

        this.dialog.open(AigContextUserNewUpdateModalComponent, { data: { contextUser: contextUserDTO }});
    }

}