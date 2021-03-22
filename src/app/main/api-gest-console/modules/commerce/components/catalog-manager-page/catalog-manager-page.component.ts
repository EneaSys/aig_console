import { Component } from '@angular/core';
import { CatalogDTO, CatalogResourceService, PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './catalog-manager-page.component.html',
    styleUrls: ['./catalog-manager-page.component.scss']
})
export class AigCatalogManagerPageComponent extends GenericComponent {
    constructor(
        private catalogResourceService: CatalogResourceService,
        private priceListItemResourceService: PriceListItemResourceService,
        aigGenericComponentService: AigGenericComponentService,
        private eventService: EventService,
    ) { super(aigGenericComponentService) }

    staticCatalog: CatalogDTO = null;

    catalogDTOs: CatalogDTO[] = [];
    selectedCatalog: CatalogDTO;

    loadingPage: boolean = true;
    errorInLoading: any;

    /* catalogItemDTOs: CatalogItemDTO[] = []; */

    priceListDC: string[] = ["id", "name", "seller", "buttons"];

    priceListItemDTOs: PriceListItemDTO[] = [];
    priceListItemDC: string[] = ["active", "catalogItem", "priceList", "priceListItem"];

    private setCatalog(selectedCatalog: CatalogDTO) {
        this.selectedCatalog = selectedCatalog;
        setTimeout(() => {
            this.eventService.reloadCurrentPage();
          }, 1);
    }

    async loadPage() {
        try {
            this.catalogDTOs = await this.catalogResourceService.getAllCatalogsUsingGET({}).toPromise();
            if (this.catalogDTOs.length > 0) {
                this.setCatalog(this.catalogDTOs[0]);
            } else {
                throw new Error("Nessun catalogo associato");
            }
        } catch (e) {
            this.errorInLoading = e;
        }

        this.loadPriceListItem()

        /* try {
            this.catalogItemDTOs = await this.catalogItemResourceService.getAllCatalogItemsUsingGET({}).toPromise();
            if (this.catalogItemDTOs.length > 0) {
                this.setCatalog(this.catalogDTOs[0]);
            } else {
                throw new Error("Nessun catalogo associato");
            }
        } catch (e) {
            this.errorInLoading = e;
        }

        try {
            this.priceListItemDTOs = await this.priceListItemResourceService.getAllPriceListItemsUsingGET({}).toPromise();
            if (this.priceListItemDTOs.length > 0) {
                this.setCatalog(this.catalogDTOs[0]);
            } else {
                throw new Error("Nessun catalogo associato");
            }
        } catch (e) {
            this.errorInLoading = e;
        } */
    }

    async loadPriceListItem() {
        this.priceListItemDTOs = await this.priceListItemResourceService.getAllPriceListItemsUsingGET({}).toPromise()
    }

}