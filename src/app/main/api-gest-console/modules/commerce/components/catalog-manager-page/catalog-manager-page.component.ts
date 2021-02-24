import { Component } from '@angular/core';
import { CatalogDTO, CatalogResourceService, PriceListDTO, PriceListResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './catalog-manager-page.component.html',
    styleUrls: ['./catalog-manager-page.component.scss']
})
export class AigCatalogManagerPageComponent extends GenericComponent {
    constructor(
        private catalogResourceService: CatalogResourceService,
        private priceListResourceService: PriceListResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    catalogDTOs: CatalogDTO[] = [];
    selectedCatalog: CatalogDTO;

    loadingPage: boolean = true;
    errorInLoading: any;

    priceListDTOs: PriceListDTO[];
    priceListDC: string[];
    priceListError: any;

    filter = {
        idEquals: null,
        nameContains: null,
        page: 0
    }

    catalogFilter = {
        catalogIdEquals: null,
    }

    private setCatalog(selectedCatalog: CatalogDTO) {
        this.selectedCatalog = selectedCatalog;
        this.loadCatalog();
    }

    async loadCatalog() {
        this.catalogFilter.catalogIdEquals = this.selectedCatalog.id;
        this.loadingPage = false;
        this.priceListDTOs = await this.priceListResourceService.getAllPriceListsUsingGET(this.catalogFilter).toPromise();
    }

    async loadPage() {
        try {
            this.catalogDTOs = await this.catalogResourceService.getAllCatalogsUsingGET(this.filter).toPromise();
            if (this.catalogDTOs.length > 0) {
                this.setCatalog(this.catalogDTOs[0]);
            } else {
                throw new Error("Nessun catalogo associato");
            }
        } catch (e) {
            this.errorInLoading = e;
        }

        this.priceListDC = ["id", "name", "catalog", "seller", "buttons"];

        this.loadCatalog();
    }

}