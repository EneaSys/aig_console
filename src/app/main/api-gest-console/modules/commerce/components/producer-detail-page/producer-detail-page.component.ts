import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemDTO, InventoryItemResourceService, ProducerDTO, ProducerResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigProducerNewUpdateModalComponent } from '../producer-new-update-modal-component/producer-new-update-modal.component';

@Component({
	selector: 'aig-producer-detail-page',
	templateUrl: './producer-detail-page.component.html',
	styleUrls: ['./producer-detail-page.component.scss']
})
export class AigProducerDetailPageComponent extends GenericComponent {
	constructor(
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
		private producerResourceService: ProducerResourceService,
		private inventoryItemResourceService: InventoryItemResourceService,
		private route: ActivatedRoute,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	producerDTO: ProducerDTO;

	loadPage() {
		this.producerDTO = this.route.snapshot.data.producer;
		this.loadOther();
	}

	async reloadPage() {
		this.producerDTO = await this.producerResourceService.getProducerUsingGET(this.producerDTO.id).toPromise();
		this.loadOther();
	}

	async loadOther() {
		this.loadInventoryItem();
	}

	editProducer(producerDTO: ProducerDTO) {
		this.dialog.open(AigProducerNewUpdateModalComponent, { data: { producer: producerDTO } });
	}

	async deleteProducer(id: number) {
		this._fuseProgressBarService.show();

		try {
			await this.producerResourceService.deleteProducerUsingDELETE(id).toPromise();

			this._snackBar.open(`Producer: '${id}' deleted.`, null, { duration: 2000, });

			this.router.navigate(['/commerce', 'producer']);
		} catch (e) {
			this._snackBar.open(`Error during deleting producer: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}

	inventoryItemDC: string[] = ["id", "inventoryCategoryName", "name", "buttons",];
	inventoryItemDTOs: InventoryItemDTO[];
	inventoryItemError: any;
	async loadInventoryItem() {
		let filters = {
			producerIdEquals: this.producerDTO.id
		};
		try {
			this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET(filters).toPromise();
		} catch (e) {
			this.inventoryItemError = e;
		}
	}

}