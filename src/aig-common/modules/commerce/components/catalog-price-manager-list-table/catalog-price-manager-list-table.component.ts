import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CatalogDTO, CatalogItemDTO, CatalogItemResourceService, PriceListDTO, PriceListItemDTO, PriceListItemResourceService, PriceListResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
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

    constructor(
        private catalogItemResourceService: CatalogItemResourceService,
        private priceListResourceService: PriceListResourceService,
        private priceListItemResourceService: PriceListItemResourceService,
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
        console.log(priceListDTO);
    }
}