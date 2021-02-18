import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooTypeResourceService, EopooTypeDTO } from 'aig-generic';
import { AigEopooTypeNewUpdateModalComponent } from '../eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';

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

    displayColumns = ["id", "name", "buttons"];
    eopooTypeDTOs: EopooTypeDTO[];
    error: any;

    async loadComponent() {
        try {
            this.eopooTypeDTOs = await this.eopooTypeResourceService.getAllEopooTypesUsingGET().toPromise();
        } catch (error) {
            this.error = error;
        }
    }

    newEopooType() {
        this.dialog.open(AigEopooTypeNewUpdateModalComponent, { data: { eopooType: {} } });
    }
}
