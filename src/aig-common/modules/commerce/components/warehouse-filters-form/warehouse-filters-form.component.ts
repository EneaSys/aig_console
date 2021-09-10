import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'warehouse-filters-form',
    templateUrl: './warehouse-filters-form.component.html',
    styleUrls: ['./warehouse-filters-form.component.scss']
})
export class WarehouseFilterFormComponent extends GenericComponent {
    constructor( 
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

 

    
}
