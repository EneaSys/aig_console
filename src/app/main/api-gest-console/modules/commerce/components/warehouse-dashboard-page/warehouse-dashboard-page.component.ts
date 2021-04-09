import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'warehouse-dashboard-page',
    templateUrl: './warehouse-dashboard-page.component.html',
    styleUrls: ['./warehouse-dashboard-page.component.scss']
})
export class AigWarehouseDashboardPageComponent extends GenericComponent {
	constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
    
}
