import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'inventory-category-list-page',
    templateUrl: './inventory-category-list-page.component.html',
    styleUrls: ['./inventory-category-list-page.component.scss']
})
export class AigInventoryCategoryListPageComponent extends GenericComponent {
    constructor(
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryCategoryDTOs: InventoryCategoryDTO[];
	inventoryCategoryDC: string[] = [ "id", "name", "buttons" ];
    inventoryCategoryError: any;
    
    length: number;
	page: number;
	size: number = 2;

    loadPage() {
		this.reloadPage();
    }
    
    paginationEvent(pageEvent: PageEvent) {
		this.page = pageEvent.pageIndex;
		this.size = pageEvent.pageSize;

		this.reloadPage();
    }
    
    async reloadPage() {
		try {
            this.length = await this.inventoryCategoryResourceService.countInventoryCategoriesUsingGET().toPromise();
			this.inventoryCategoryDTOs = await this.inventoryCategoryResourceService.getAllInventoryCategoriesUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,this.size).toPromise();
		} catch(e) {
			this.inventoryCategoryError = e;
		}
	}
}