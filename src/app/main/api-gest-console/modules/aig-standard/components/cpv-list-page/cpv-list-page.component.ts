import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CpvDTO, CpvResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCpvDialogComponent } from 'aig-common/modules/standard/components/cpv/cpv-dialog-page/cpv-dialog-page.component';

@Component({
    templateUrl: './cpv-list-page.component.html',
    styleUrls: ['./cpv-list-page.component.scss']
})
export class AigCpvListPageComponent extends GenericComponent {
    constructor(
        private cpvResourceService: CpvResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    
    displayedColumns: string[] = ['id', 'code', 'name', 'buttons'];
    cpvs: CpvDTO[];

    async loadComponent() {
        this.cpvs = await this.cpvResourceService.getAllCpvsUsingGET().toPromise();
    }

    newCpv(){
        this.dialog.open(AigCpvDialogComponent);
    }
}
