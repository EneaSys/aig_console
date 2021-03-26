import { Component, Input } from '@angular/core';
import { CatalogDTO, CatalogItemDTO, CatalogItemResourceService, PriceListDTO, PriceListItemDTO, PriceListItemResourceService, PriceListResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

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
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    filter = {
        catalogIdEquals: null
    }

    filtri = {
        catalogItemIdEquals: null
    }

    loadFilters(){
        this.filter.catalogIdEquals = this.staticCatalog ? this.staticCatalog.id : null;
    }


    temp: any = {};

    async loadPage(){
        this.loadFilters();
        this.catalogItemDTOs = await this.catalogItemResourceService.getAllCatalogItemsUsingGET(this.filter).toPromise();
        this.priceListDTOs = await this.priceListResourceService.getAllPriceListsUsingGET(this.filter).toPromise();
        this.priceListItemDTOs = await this.priceListItemResourceService.getAllPriceListItemsUsingGET(this.filtri).toPromise();

        this.priceListItemDTOs.forEach((priceListItemDTO: PriceListItemDTO) => {

            if(this.temp[priceListItemDTO.catalogItemId] == null) {
                this.temp[priceListItemDTO.catalogItemId] = {};
            }

            this.temp[priceListItemDTO.catalogItemId][priceListItemDTO.priceListId] = priceListItemDTO;
        })

        console.log(this.temp);
    }
}