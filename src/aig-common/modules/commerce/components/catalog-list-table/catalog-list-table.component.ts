import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogDTO, CatalogResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigCatalogNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/catalog-new-update-dialog/catalog-new-update-dialog.component';
import { AigCatalogNewUpdateFormComponent } from '../catalog-new-update-form/catalog-new-update-form.component';

@Component({
    selector: 'aig-catalog-list-table',
    templateUrl: './catalog-list-table.component.html',
    styleUrls: ['./catalog-list-table.component.scss']
})
export class AigCatalogListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor(
        private catalogResourceService: CatalogResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteCatalog(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.catalogResourceService.deleteCatalogUsingDELETE(id).toPromise();
            this._snackBar.open(`Catalog: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting catalog: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editCatalog(catalogDTO: CatalogDTO) {
        this.dialog.open(AigCatalogNewUpdateDialogComponent, { data: { catalog: catalogDTO } });
    }
}
