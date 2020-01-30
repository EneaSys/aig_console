import { Component, OnInit } from '@angular/core';
import { CpvDTO } from 'aig-standard';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './cpv-detail-page.component.html',
    styleUrls: ['./cpv-detail-page.component.scss']
})
export class AigCpvDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    cpv: CpvDTO;

    loadComponent(): void {
        this.cpv = this.route.snapshot.data.cpv;
    }

    addPermissionToCpv(): void {
        // this.dialog.open(AigAssociateCpvToPermissionDialogComponent, { data: { cpv: this.cpv } });
    }
}
