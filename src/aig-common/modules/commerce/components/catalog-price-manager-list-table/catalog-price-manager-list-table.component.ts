import { Component, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogDTO, CatalogItemDTO, CatalogItemResourceService, PriceListDTO, PriceListItemDTO, PriceListItemResourceService, PriceListResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCatalogItemNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/catalog-item-new-update-dialog/catalog-item-new-update-dialog.component';
import { AigPriceListItemNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/price-list-item-new-update-dialog/price-list-item-new-update-dialog.component';

@Component({
    selector: 'aig-catalog-price-manager-list-table',
    templateUrl: './catalog-price-manager-list-table.component.html',
    styleUrls: ['./catalog-price-manager-list-table.component.scss']
})
export class AigCatalogPriceManagerListTableComponent extends GenericComponent {

    @Input()
	staticCatalog: CatalogDTO = null;

    catalogItemDTOs: CatalogItemDTO[];

    priceListDTOs: PriceListDTO[];

    priceListItemDTOs: PriceListItemDTO[];

    priceListItemDTO: PriceListItemDTO;

    constructor(
        private catalogItemResourceService: CatalogItemResourceService,
        private priceListResourceService: PriceListResourceService,
        private priceListItemResourceService: PriceListItemResourceService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    filter = {
        catalogIdEquals: null,
        catalogItemIdEquals: null
    }

    loadFilters(){
        this.filter.catalogIdEquals = this.staticCatalog ? this.staticCatalog.id : null;
    }

    temp: any = {};

    async loadPage(){
        this.preparePage();
    }

    reloadPage() {
		this.preparePage();
	}

    async preparePage(){
        this.loadFilters();
        this.catalogItemDTOs = await this.catalogItemResourceService.getAllCatalogItemsUsingGET(this.filter).toPromise();
        this.priceListDTOs = await this.priceListResourceService.getAllPriceListsUsingGET(this.filter).toPromise();
        this.priceListItemDTOs = await this.priceListItemResourceService.getAllPriceListItemsUsingGET(this.filter).toPromise();

        this.priceListItemDTOs.forEach((priceListItemDTO: PriceListItemDTO) => {

            if(this.temp[priceListItemDTO.catalogItemId] == null) {
                this.temp[priceListItemDTO.catalogItemId] = {};
            }

            this.temp[priceListItemDTO.catalogItemId][priceListItemDTO.priceListId] = priceListItemDTO;
        })
    }


    newPriceListItem(priceListDTO: PriceListDTO, catalogItemDTO: CatalogItemDTO): void {
        this.dialog.open(AigPriceListItemNewUpdateDialogComponent, { data: { priceList: priceListDTO, catalogItem: catalogItemDTO } });
    }

    editPriceListItem(priceListItemDTO: PriceListItemDTO) {
        this.dialog.open(AigPriceListItemNewUpdateDialogComponent, { data: { priceListItem: priceListItemDTO } });
    }

    async deletePriceListItem(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.priceListItemResourceService.deletePriceListItemUsingDELETE(id).toPromise();
            this._snackBar.open(`Price list item: '${id}' deleted.`, null, { duration: 2000, });
            
            setTimeout(() => {
                this.eventService.reloadCurrentPage();
              }, 1);
        } catch (e) {
            this._snackBar.open(`Error during deleting price list item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    newCatalogItem(staticCatalog: CatalogDTO): void {
        this.dialog.open(AigCatalogItemNewUpdateDialogComponent, { data: { catalogItem: {}, staticCatalog: staticCatalog } });
    }
}