import { Component } from '@angular/core';
import { CatalogDTO, CatalogResourceService } from 'aig-commerce';
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
        aigGenericComponentService: AigGenericComponentService,
        private eventService: EventService,
    ) { super(aigGenericComponentService) }

    catalogDTOs: CatalogDTO[] = [];
    selectedCatalog: CatalogDTO;

    loadingPage: boolean = true;
    errorInLoading: any;

    priceListDC: string[] = ["id", "name", "seller", "buttons"];

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
    }

}