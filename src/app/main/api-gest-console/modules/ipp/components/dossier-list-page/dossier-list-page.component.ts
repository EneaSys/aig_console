import { Component } from "@angular/core";
import { FormBuilder, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { DossierDTO, DossierResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigDossierNewUpdateDialogComponent } from "../dossier-new-update-dialog/dossier-new-update-dialog.component";

@Component({
    templateUrl: './dossier-list-page.component.html',
    styleUrls: ['./dossier-list-page.component.scss']
})
export class AigDossierListPageComponent extends GenericComponent {
    constructor(
       
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        private dossierResourceService: DossierResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

loadPage() {
	this.initDossierSearch();

	this.showAllDossier();
}

reloadPage() {
	this.showAllDossier();
}


//			---- TABLE AND SEARCH SECTION ----

dossierSearchFormGroup: FormGroup;
dossierPaginationSize: number;
dossierFilters: any;

dossierLength: number;
dossierDTOs: DossierDTO[];
dossierError: any;

dossierDC: string[];

	
private initDossierSearch() {
	this.dossierDC = ["id","description","dossierCode","partecipationId","preparationId","procurementId","procurementLotId","buttons"];

	this.dossierPaginationSize = 10;
		

	this.dossierSearchFormGroup = this._formBuilder.group({
		id: [''],
		description: [''],
		dossierCode: [''],
		partecipationId: ['',Validators.required],
		preparationId: [''],
		procurementId: [''],
		procurementLotId: ['']

	});
}

private clearFiltersDossier() {
	this.dossierFilters = {
		idEquals: null,
		dossierCodeContains: null,
	}
}

private async searchDossier(page: number) {
	this.dossierDTOs = null;

	this.dossierFilters.page = page;
	this.dossierFilters.size = this.dossierPaginationSize;

	try {
		this.dossierLength = await this.dossierResourceService.countDossiersUsingGET({}).toPromise();  

		if(this.dossierLength == 0) {
			this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
			this.dossierDTOs = [];
			return;
		}

		this.dossierDTOs =  await this.dossierResourceService.getAllDossiersUsingGET({}).toPromise();
	} catch (e) {
		console.log(e);
		this.dossierError = e;
	}
}

	

showAllDossier() {
	this.resetFiltersDossier();
		
}

resetFiltersDossier() {
	this.dossierSearchFormGroup.reset();
	this.clearFiltersDossier();
	this.searchDossier(0);
}

dossierPaginationEvent(pageEvent: PageEvent) {
	this.dossierPaginationSize = pageEvent.pageSize;
	this.searchDossier(pageEvent.pageIndex);
}

dossierSearchWithFilter() {
	let searchedId = this.dossierSearchFormGroup.controls.id.value;
	if(searchedId != null) {
		this.clearFiltersDossier();
		this.dossierSearchFormGroup.reset();
		this.dossierFilters.idEquals = searchedId;
		this.searchDossier(0);
		return;
	}
	this.dossierFilters.idEquals = null;

		/*this.dossierFilters.nameContains = this.dossierSearchFormGroup.controls.name.value;*/

	this.searchDossier(0);
}

	//			---- !TABLE AND SEARCH SECTION ----

newDossier(): void {
    this.dialog.open(AigDossierNewUpdateDialogComponent, { data: { dossier: {} } });
}

	
}

