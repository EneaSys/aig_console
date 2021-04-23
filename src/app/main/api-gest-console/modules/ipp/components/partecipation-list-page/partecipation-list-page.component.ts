import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { DossierDTO, DossierResourceService, PartecipationDTO, PartecipationResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigDossierNewUpdateDialogComponent } from "../dossier-new-update-dialog/dossier-new-update-dialog.component";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";

@Component({
    templateUrl: './partecipation-list-page.component.html',
    styleUrls: ['./partecipation-list-page.component.scss']
})
export class AigPartecipationListPageComponent extends GenericComponent {
    constructor(
       
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        private partecipationResourceService: PartecipationResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initPartecipationSearch();

		this.showAllPartecipation();
	}

	reloadPage() {
		this.showAllPartecipation();
	}


//			---- TABLE AND SEARCH SECTION ----

partecipationSearchFormGroup: FormGroup;
partecipationPaginationSize: number;
partecipationFilters: any;

partecipationLength: number;
partecipationDTOs: PartecipationDTO[];
partecipationError: any;

partecipationDC: string[];

	
private initPartecipationSearch() {
	this.partecipationDC = ["id","partecipationTypeCode","procurementLotCig","proposerEopooCode","siteInspection","expiryDate","baseAmount","ippLotCategoryCode","statusDescription","buttons"]

	this.partecipationPaginationSize = 10;
		

	this.partecipationSearchFormGroup = this._formBuilder.group({
		id: ['',Validators.required],
		partecipationTypeCode: [''],
		procurementLotCig: ['',Validators.required],
		proposerEopooCode: [''],
		siteInspection: [''],
		statusDescription: ['',Validators.required],
	});
}

private clearFiltersPartecipation() {
	this.partecipationFilters = {
	idEquals: null,
	}
}

private async searchPartecipation(page: number) {
	this.partecipationDTOs = null;

	this.partecipationFilters.page = page;
	this.partecipationFilters.size = this.partecipationPaginationSize;

	try {
		this.partecipationLength = await this.partecipationResourceService.countPartecipationsUsingGET({}).toPromise();  

			if(this.partecipationLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.partecipationDTOs = [];
				return;
			}

		    this.partecipationDTOs =  await this.partecipationResourceService.getAllPartecipationsUsingGET({}).toPromise();
		} catch (e) {
			this.partecipationError = e;
		}
	}

	

showAllPartecipation() {
	this.resetFiltersPartecipation();
		
}

resetFiltersPartecipation() {
	this.partecipationSearchFormGroup.reset();
		this.clearFiltersPartecipation();
		this.searchPartecipation(0);

}

partecipationPaginationEvent(pageEvent: PageEvent) {
	this.partecipationPaginationSize = pageEvent.pageSize;
	this.searchPartecipation(pageEvent.pageIndex);
}

partecipationSearchWithFilter() {
	let searchedId = this.partecipationSearchFormGroup.controls.id.value;

	if(searchedId != null) {
		this.clearFiltersPartecipation();
		this.partecipationSearchFormGroup.reset();
		this.partecipationFilters.idEquals = searchedId;
		this.searchPartecipation(0);
		return;
	}
	this.partecipationFilters.idEquals = null;

		/*this.dossierFilters.nameContains = this.dossierSearchFormGroup.controls.name.value;*/

	this.searchPartecipation(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newPartecipation(): void {
        this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: { partecipation: {} } });
    }

	
}

