import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import {PartecipationStatusDTO, PartecipationStatusResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPartecipationStatusNewUpdateDialogComponent } from "../partecipation-status-new-update-dialog/partecipation-status-new-update-dialog.component";


@Component({
    templateUrl: './partecipation-status-list-page.component.html',
    styleUrls: ['./partecipation-status-list-page.component.scss']
})
export class AigPartecipationStatusListPageComponent extends GenericComponent {
    constructor(
       
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        private partecipationStatusResourceService: PartecipationStatusResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initPartecipationStatusSearch();

		this.showAllPartecipationStatus();
	}

	reloadPage() {
		this.showAllPartecipationStatus();
	}


	//			---- TABLE AND SEARCH SECTION ----

	partecipationStatusSearchFormGroup: FormGroup;
	partecipationStatusPaginationSize: number;
	partecipationStatusFilters: any;

	partecipationStatusLength: number;
	partecipationStatusDTOs: PartecipationStatusDTO[];
	partecipationStatusError: any;

	partecipationStatusDC: string[];

		
	private initPartecipationStatusSearch() {
		this.partecipationStatusDC = ["id","description","buttons"];

		this.partecipationStatusPaginationSize = 10;
			

		this.partecipationStatusSearchFormGroup = this._formBuilder.group({
				id: [''],
				description: [''],
			});
		}

	private clearFiltersPartecipationStatus() {
		this.partecipationStatusFilters = {
			idEquals: null,
		}
	}

	private async searchPartecipationStatus(page: number) {
		this.partecipationStatusDTOs = null;

		this.partecipationStatusFilters.page = page;
		this.partecipationStatusFilters.size = this.partecipationStatusPaginationSize;

		try {
			this.partecipationStatusLength = await this.partecipationStatusResourceService.countPartecipationStatusesUsingGET({}).toPromise();  

			if(this.partecipationStatusLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.partecipationStatusDTOs = [];
				return;
			}

			this.partecipationStatusDTOs =  await this.partecipationStatusResourceService.getAllPartecipationStatusesUsingGET({}).toPromise();
		} catch (e) {
			console.log(e);
			this.partecipationStatusError = e;
		}
	}

		

	showAllPartecipationStatus() {
		this.resetFiltersPartecipationStatus();
			
	}

	resetFiltersPartecipationStatus() {
		this.partecipationStatusSearchFormGroup.reset();
		this.clearFiltersPartecipationStatus();
		this.searchPartecipationStatus(0);

	}

	partecipationStatusPaginationEvent(pageEvent: PageEvent) {
		this.partecipationStatusPaginationSize = pageEvent.pageSize;
		this.searchPartecipationStatus(pageEvent.pageIndex);
	}

	partecipationStatusSearchWithFilter() {
		let searchedId = this.partecipationStatusSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPartecipationStatus();
			this.partecipationStatusSearchFormGroup.reset();
			this.partecipationStatusFilters.idEquals = searchedId;
			this.searchPartecipationStatus(0);
			return;
		}
		this.partecipationStatusFilters.idEquals = null;

			/*this.dossierFilters.nameContains = this.dossierSearchFormGroup.controls.name.value;*/

		this.searchPartecipationStatus(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newPartecipationStatus(): void {
		this.dialog.open(AigPartecipationStatusNewUpdateDialogComponent, { data: {} });
	}

	
	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/

	
}

