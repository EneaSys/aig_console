import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CpvDTO, CpvResourceService } from 'aig-standard';
import { AigCpvNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/cpv-new-update-modal/cpv-new-update-modal.component';

@Component({
    selector: 'aig-cpv-list-table',
    templateUrl: './cpv-list-table.component.html',
    styleUrls: ['./cpv-list-table.component.scss']
})
export class AigCpvListTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input() 
    dataSource: any[];
    @Input()
    error: any[];
    
    constructor(
        private router: Router,
        private cpvResourceService: CpvResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    
    async deleteCpv(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.cpvResourceService.deleteCpvUsingDELETE(id).toPromise();
            this._snackBar.open(`City: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting cpv: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editCpv(cpvDTO: CpvDTO) {
        this.dialog.open(AigCpvNewUpdateModalComponent, { data: { cpv: cpvDTO } });
    }
}
