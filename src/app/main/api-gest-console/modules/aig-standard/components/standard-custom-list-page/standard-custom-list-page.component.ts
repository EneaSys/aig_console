import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'aig-standard-custom-list-page',
    templateUrl: './standard-custom-list-page.component.html',
    styleUrls: ['./standard-custom-list-page.component.scss']
})
export class AigStandardCustomListPageComponent extends GenericComponent {
    constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
}