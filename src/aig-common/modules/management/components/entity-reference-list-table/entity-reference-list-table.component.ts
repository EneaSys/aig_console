import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { EntityReferenceDTO, EntityReferenceResourceService } from 'aig-management';
import { AigEntityReferenceNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/entity-reference-new-update-modal/entity-reference-new-update-modal.component';

@Component({
	selector: 'aig-entity-reference-list-table',
	templateUrl: './entity-reference-list-table.component.html',
	styleUrls: ['./entity-reference-list-table.component.scss']
})
export class AigEntityReferenceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
	error: any;
	
	constructor(
        private entityReferenceResourceService: EntityReferenceResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
		private router: Router,
	) { }

	ngOnInit(): void { }

	async deleteEntityReference(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.entityReferenceResourceService.deleteEntityReferenceUsingDELETE(id).toPromise();
            this._snackBar.open(`Entity Reference: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Entity Reference: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editEntityReference(entityReferenceDTO: EntityReferenceDTO) {
        this.dialog.open(AigEntityReferenceNewUpdateModalComponent, { data: { entityReference: entityReferenceDTO } });
    }
}
