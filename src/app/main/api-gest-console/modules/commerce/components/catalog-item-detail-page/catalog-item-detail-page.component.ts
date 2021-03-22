import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CatalogItemDTO, CatalogItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCatalogItemNewUpdateDialogComponent } from '../catalog-item-new-update-dialog/catalog-item-new-update-dialog.component';

@Component({
    selector: 'aig-catalog-item-detail-page',
    templateUrl: './catalog-item-detail-page.component.html',
    styleUrls: ['./catalog-item-detail-page.component.scss']
})
export class AigCatalogItemDetailPageComponent extends GenericComponent {
    constructor(
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
}