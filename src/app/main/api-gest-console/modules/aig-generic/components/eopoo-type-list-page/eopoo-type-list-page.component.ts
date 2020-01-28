import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooTypeResourceService, EopooTypeDTO } from 'api-gest';

@Component({
    templateUrl: './eopoo-type-list-page.component.html',
    styleUrls: ['./eopoo-type-list-page.component.scss']
})
export class AigEopooTypeListPageComponent extends GenericComponent {
    constructor(
        private eopooTypeResourceService: EopooTypeResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
    
    displayedColumns = ["id", "name", "buttons"];
    eopooTypeDTOs: EopooTypeDTO[];

    async loadComponent() {
        this.eopooTypeDTOs = await this.eopooTypeResourceService.getAllEopooTypesUsingGET().toPromise();
    }
}
