import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProducerDTO, ProducerResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
	selector: 'aig-producer-detail-page',
	templateUrl: './producer-detail-page.component.html',
	styleUrls: ['./producer-detail-page.component.scss']
})
export class AigProducerDetailPageComponent extends GenericComponent {
    constructor(
        private producerResourceService: ProducerResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	producerDTO: ProducerDTO;

    loadPage() {
		this.producerDTO = this.route.snapshot.data.tenantContext;
	}

	async reloadPage() {
		this.producerDTO = await this.producerResourceService.getProducerUsingGET(this.producerDTO.id).toPromise();
	}
	
    editProducer(producerDTO: ProducerDTO) {
		this.dialog.open(AigProducerNewUpdateForm, { data: { producer: producerDTO } });
    }
}