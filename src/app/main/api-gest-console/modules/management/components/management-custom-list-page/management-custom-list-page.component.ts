import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'aig-management-custom-list-page',
    templateUrl: './management-custom-list-page.component.html',
    styleUrls: ['./management-custom-list-page.component.scss']
})
export class AigManagementCustomListPageComponent extends GenericComponent {
    constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
}