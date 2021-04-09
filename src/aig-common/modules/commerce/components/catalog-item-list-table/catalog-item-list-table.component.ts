import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogItemDTO, CatalogItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigCatalogItemNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/catalog-item-new-update-dialog/catalog-item-new-update-dialog.component';
import { AigCatalogItemNewUpdateFormComponent } from '../catalog-item-new-update-form/catalog-item-new-update-form.component';

@Component({
    selector: 'aig-catalog-item-list-table',
    templateUrl: './catalog-item-list-table.component.html',
    styleUrls: ['./catalog-item-list-table.component.scss']
})
export class AigCatalogItemListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor(
        private catalogItemResourceService: CatalogItemResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }
    
    async deleteCatalogItem(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.catalogItemResourceService.deleteCatalogItemUsingDELETE(id).toPromise();
            this._snackBar.open(`Catalog Item: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting catalog item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editCatalogItem(catalogItemDTO: CatalogItemDTO) {
        this.dialog.open(AigCatalogItemNewUpdateDialogComponent, { data: { catalogItem: catalogItemDTO } });
    }
}