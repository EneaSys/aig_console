import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'catalog-list-page',
    templateUrl: './catalog-list-page.component.html',
    styleUrls: ['./catalog-list-page.component.scss']
})
export class AigCatalogListPageComponent extends GenericComponent {
	constructor(
		private catalogResourceService: CatalogResourceService,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {

    }

	reloadPage() {

    }
}