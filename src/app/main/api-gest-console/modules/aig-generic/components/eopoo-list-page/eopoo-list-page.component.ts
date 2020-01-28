import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooResourceService, EopooDTO } from 'aig-generic';
import { MatDialog } from '@angular/material/dialog';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';

@Component({
    templateUrl: './eopoo-list-page.component.html',
    styleUrls: ['./eopoo-list-page.component.scss']
})
export class AigEopooListPageComponent extends GenericComponent {
    constructor(
        private eopooResourceService: EopooResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['id', 'type', 'name', 'taxid', 'buttons'];
    
    eopooDTOs: EopooDTO[];

    async loadComponent() {
        this.eopooDTOs = await this.eopooResourceService.getAllEopoosUsingGET().toPromise();
    }

    newEopoo() {
        this.dialog.open(AigEopooNewModalComponent);
    }
}
