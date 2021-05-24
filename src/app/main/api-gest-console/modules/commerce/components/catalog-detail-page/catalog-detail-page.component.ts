import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogDTO, CatalogItemDTO, CatalogItemResourceService, CatalogResourceService, PriceListDTO, PriceListResourceService } from 'aig-commerce';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCatalogNewUpdateDialogComponent } from '../catalog-new-update-dialog/catalog-new-update-dialog.component';
import { AigCommerceGenericComponent } from '../commerce-generic-component';

@Component({
    selector: 'aig-catalog-detail-page.component',
    templateUrl: './catalog-detail-page.component.html',
    styleUrls: ['./catalog-detail-page.component.scss']
})
export class AigCatalogDetailPageComponent extends AigCommerceGenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private catalogResourceService: CatalogResourceService,
        private catalogItemResourceService: CatalogItemResourceService,
        private priceListResourceService: PriceListResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    catalogDTO: CatalogDTO;

    loadPage() {
        this.catalogDTO = this.route.snapshot.data.catalog;
        this.loadOther();
    }

    async reloadPage() {
        this.catalogDTO = await this.catalogResourceService.getCatalogUsingGET(this.catalogDTO.id).toPromise();
        this.loadOther();
    }

    async loadOther() {
        this.loadCatalogItem();
        this.loadPriceList();
    }

    editCatalog(catalogDTO: CatalogDTO) {
        this.dialog.open(AigCatalogNewUpdateDialogComponent, { data: { catalog: catalogDTO } });
    }

    async deleteCatalog(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.catalogResourceService.deleteCatalogUsingDELETE(id).toPromise();

            this._snackBar.open(`Catalog: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/commerce', 'catalog']);
        } catch (e) {
            this._snackBar.open(`Error during deleting catalog: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    catalogItemDC: string[] = ["id", "active", "inventoryItemProducer", "inventoryItemCombination", "buttons"];
    catalogItemDTOs: CatalogItemDTO[];
    catalogItemError: any;
    async loadCatalogItem() {
        let filters = {
            catalogIDEquals: this.catalogDTO.id
        };
        try {
            this.catalogItemDTOs = await this.catalogItemResourceService.getAllCatalogItemsUsingGET(filters).toPromise();
        } catch (e) {
            this.catalogItemError = e;
        }
    }

    priceListDC: string[] = ["id", "name", "seller", "buttons"];
    priceListDTOs: PriceListDTO[];
    priceListError: any;
    async loadPriceList() {
        let filters = {
            catalogIDEquals: this.catalogDTO.id
        };
        try {
            this.priceListDTOs = await this.priceListResourceService.getAllPriceListsUsingGET(filters).toPromise();
        } catch (e) {
            this.priceListError = e;
        }
    }
}