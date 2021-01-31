import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'aig-warehouse-list-page',
    templateUrl: './warehouse-list-page.component.html',
    styleUrls: ['./warehouse-list-page.component.scss']
})
export class AigWarehouseListPageComponent extends GenericComponent {
    constructor(
        private warehouseResourceService: WarehouseResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    warehouseDisplayColumns: string[] = ["id", "name", "buttons"];
    warehouseDTOs: WarehouseDTO[];
    warehouseError : any;

    length : number;
    page : number;
    size: number = 10;

    loadPage() {
        this.reloadPage();     
    }

    paginationEvent (pageEvent:PageEvent) {
        this.page = pageEvent.pageIndex;
        this.size = pageEvent.pageSize
    }

    async loadComponent() {
        try {
            this.length = await this.warehouseResourceService.countWarehousesUsingGET().toPromise();
            this.warehouseDTOs = await this.warehouseResourceService.getAllWarehousesUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,this.size,).toPromise();
        } catch (e) {
            this.warehouseError = e;
        }
    }
   
	
}