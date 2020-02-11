import { Component } from '@angular/core';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CpvDTO, CpvResourceService } from 'aig-standard';
import { AigCpvNewUpdateModalComponent } from '../cpv-new-update-modal/cpv-new-update-modal.component';

@Component({
    templateUrl: './cpv-list-page.component.html',
    styleUrls: ['./cpv-list-page.component.scss']
})
export class AigCpvListPageComponent extends GenericComponent {
    constructor(
        private cpvResourceService: CpvResourceService,
        private eventService: EventService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    cpvDisplayedColumns: string[] = ['id', 'name', 'code', 'wikiCode', 'buttons'];
    cpvDataSource: CpvDTO[];

    async loadComponent() {
        this.cpvDataSource = await this.cpvResourceService.getAllCpvsUsingGET().toPromise();
    }
    
    newCpv(): void {
        this.dialog.open(AigCpvNewUpdateModalComponent, { data: { cpv: {} } });
    }

}
