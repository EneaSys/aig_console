import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'aig-warehouse-handling-list-page',
    templateUrl: './warehouse-handling-list-page.component.html',
    styleUrls: ['./warehouse-handling-list-page.component.scss']
})
export class AigWarehouseHandlingListPageComponent extends GenericComponent {
	constructor(
		private warehouseHandlingResourceService: WarehouseHandlingResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	
	loadPage() {
		this.initWarehouseHandlingSearch();

		this.showAllWarehouseHandling();
	}

	reloadPage() {
		this.showAllWarehouseHandling();
	}

	//			---- WAREHOUSE HANDLING TABLE AND SEARCH SECTION ----

	warehouseHandlingSearchFormGroup: FormGroup;
	warehouseHandlingPagination: any;
	warehouseHandlingFilters: any;

	warehouseHandlingLength: number;
	warehouseHandlingDTOs: WarehouseHandlingDTO[];
	warehouseHandlingError: any;

	warehouseHandlingDC: string[];

	private initWarehouseHandlingSearch() {
		this.warehouseHandlingPagination = {
			size: 10,
			page: 0
		}
	
		this.warehouseHandlingSearchFormGroup = this._formBuilder.group({
			id: [''],
		});

		this.warehouseHandlingDC = ["id","buttons"];
	}

	private clearFiltersWarehouseHandling() {
		this.warehouseHandlingFilters = {
			id: null,
		}
	}

	private async searchWarehouseHandling(page: number) {
		this.warehouseHandlingPagination.page = page;
		this.warehouseHandlingDTOs = null;
		try {
			this.warehouseHandlingLength = await this.warehouseHandlingResourceService.countWarehouseHandlingsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.warehouseHandlingFilters.id).toPromise(); 
			
			if(this.warehouseHandlingLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.warehouseHandlingDTOs = [];
				return;
			}

			this.warehouseHandlingDTOs = await this.warehouseHandlingResourceService.getAllWarehouseHandlingsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.warehouseHandlingFilters.id,null,null,null,null,null,null,null,null,this.warehouseHandlingPagination.page,this.warehouseHandlingPagination.size).toPromise();
		} catch (e) {
			this.warehouseHandlingError = e;
		}
	}

	showAllWarehouseHandling() {
		this.resetFiltersWarehouseHandling();
	}

	resetFiltersWarehouseHandling() {
		this.warehouseHandlingSearchFormGroup.reset();
		this.clearFiltersWarehouseHandling();
		this.searchWarehouseHandling(0);
	}

	warehouseHandlingPaginationEvent(pageEvent: PageEvent) {
		this.warehouseHandlingPagination.size = pageEvent.pageSize;
		this.searchWarehouseHandling(pageEvent.pageIndex);
	}

	warehouseHandlingSearchWithFilter() {
		let searchedId = this.warehouseHandlingSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersWarehouseHandling();
			this.warehouseHandlingSearchFormGroup.reset();
			this.warehouseHandlingFilters.id = searchedId;
			this.searchWarehouseHandling(0);
			return;
		}
		this.warehouseHandlingFilters.id = null;

		this.warehouseHandlingFilters.name = this.warehouseHandlingSearchFormGroup.controls.name.value;

		this.searchWarehouseHandling(0);
	}

/*	newWarehouseHandling(): void {
		this.dialog.open(AigProducerNewUpdateModalComponent, { data: { producer: {} } });
   }
*/	
	//			---- !WAREHOUSE HANDLING SECTION ----

	
}
