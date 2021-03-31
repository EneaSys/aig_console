import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
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
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
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

    editCatalog(catalogDTO: CatalogDTO) {
        this.dialog.open(AigCatalogNewUpdateDialogComponent, { data: { catalog: catalogDTO } });
    }
}