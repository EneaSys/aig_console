import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogItemDTO, CatalogItemResourceService } from 'aig-commerce';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCatalogItemNewUpdateDialogComponent } from '../catalog-item-new-update-dialog/catalog-item-new-update-dialog.component';
import { AigCommerceGenericComponent } from '../commerce-generic-component';

@Component({
    selector: 'aig-catalog-item-detail-page',
    templateUrl: './catalog-item-detail-page.component.html',
    styleUrls: ['./catalog-item-detail-page.component.scss']
})
export class AigCatalogItemDetailPageComponent extends AigCommerceGenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private catalogItemResourceService: CatalogItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    catalogItemDTO: CatalogItemDTO;

    loadPage() {
        this.catalogItemDTO = this.route.snapshot.data.catalogItem;
    }

    async reloadPage() {
        this.catalogItemDTO = await this.catalogItemResourceService.getCatalogItemUsingGET(this.catalogItemDTO.id).toPromise();
    }

    editCatalogItem(catalogItemDTO: CatalogItemDTO) {
        this.dialog.open(AigCatalogItemNewUpdateDialogComponent, { data: { catalogItem: catalogItemDTO } });
    }

    async deleteCatalogItem(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.catalogItemResourceService.deleteCatalogItemUsingDELETE(id).toPromise();

            this._snackBar.open(`Catalog Item: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/commerce', 'catalog-item']);
        } catch (e) {
            this._snackBar.open(`Error during deleting catalog item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }
}