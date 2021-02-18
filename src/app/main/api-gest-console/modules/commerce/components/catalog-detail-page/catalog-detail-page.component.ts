import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CatalogDTO, CatalogResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCatalogNewUpdateDialogComponent } from '../catalog-new-update-dialog/catalog-new-update-dialog.component';

@Component({
    selector: 'aig-catalog-detail-page.component',
    templateUrl: './catalog-detail-page.component.html',
    styleUrls: ['./catalog-detail-page.component.scss']
})
export class AigCatalogDetailPageComponent extends GenericComponent {
    constructor(
        private catalogResourceService: CatalogResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    catalogDTO: CatalogDTO;

    loadPage() {
        this.catalogDTO = this.route.snapshot.data.catalog;
    }

    async reloadPage() {
		this.catalogDTO = await this.catalogResourceService.getCatalogUsingGET(this.catalogDTO.id).toPromise();
	}

    editCatalog(catalogDTO: CatalogDTO) {
        this.dialog.open(AigCatalogNewUpdateDialogComponent, { data: { catalog: catalogDTO } });
    }
}