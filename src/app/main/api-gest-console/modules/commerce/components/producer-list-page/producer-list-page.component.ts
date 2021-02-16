import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ProducerDTO, ProducerResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigProducerNewUpdateModalComponent } from '../producer-new-update-modal-component/producer-new-update-modal.component';

@Component({
    selector: 'aig-producer-list-page',
    templateUrl: './producer-list-page.component.html',
    styleUrls: ['./producer-list-page.component.scss']
})
export class AigProducerListPageComponent extends GenericComponent {
	constructor(
		private producerResourceService: ProducerResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	
	loadPage() {
		this.initProducerSearch();

		this.showAllProducer();
	}

	reloadPage() {
		this.showAllProducer();
	}

	//			---- PRODUCER TABLE AND SEARCH SECTION ----

	producerSearchFormGroup: FormGroup;
	producerPaginationSize: number;
	producerFilters: any;

	producerLength: number;
	producerDTOs: ProducerDTO[];
	producerError: any;

	producerDC: string[];

	private initProducerSearch() {
		this.producerPaginationSize = 10;
	
		this.producerSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.producerDC = ["id", "name","buttons"];
	}

	private clearFiltersProducer() {
		this.producerFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchProducer(page: number) {
		this.producerFilters.page = page;
		this.producerFilters.size = this.producerPaginationSize;

		this.producerDTOs = null;
		try {
			this.producerLength = await this.producerResourceService.countProducersUsingGET(this.producerFilters).toPromise();
			
			if(this.producerLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.producerDTOs = [];
				return;
			}

			this.producerDTOs = await this.producerResourceService.getAllProducersUsingGET(this.producerFilters).toPromise();
		} catch (e) {
			this.producerError = e;
		}
	}

	showAllProducer() {
		this.resetFiltersProducer();
	}

	resetFiltersProducer() {
		this.producerSearchFormGroup.reset();
		this.clearFiltersProducer();
		this.searchProducer(0);
	}

	producerPaginationEvent(pageEvent: PageEvent) {
		this.producerPaginationSize = pageEvent.pageSize;
		this.searchProducer(pageEvent.pageIndex);
	}

	producerSearchWithFilter() {
		let searchedId = this.producerSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersProducer();
			this.producerSearchFormGroup.reset();
			this.producerFilters.idEquals = searchedId;
			this.searchProducer(0);
			return;
		}
		this.producerFilters.idEquals = null;

		this.producerFilters.nameContains = this.producerSearchFormGroup.controls.name.value;

		this.searchProducer(0);
	}

	newProducer(): void {
		this.dialog.open(AigProducerNewUpdateModalComponent, { data: { producer: {} } });
   }
	
	//			---- !PRODUCER SECTION ----

	
}