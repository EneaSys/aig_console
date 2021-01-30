import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { ProducerDTO, ProducerResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'aig-producer-list-page',
    templateUrl: './producer-list-page.component.html',
    styleUrls: ['./producer-list-page.component.scss']
})
export class AigProducerListPageComponent extends GenericComponent {
	constructor(
		private producerResourceService: ProducerResourceService,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	producerDTOs: ProducerDTO[];
	producerDC: string[] = [ "id", "name",];
	producerError: any;

	length: number;
	page: number;
	size: number = 10;
	
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
			this.length = await this.producerResourceService.countProducersUsingGET().toPromise();
            this.producerDTOs = await this.producerResourceService.getAllProducersUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,this.size).toPromise();
		} catch(e) {
			this.producerError = e;
		}
	}
}