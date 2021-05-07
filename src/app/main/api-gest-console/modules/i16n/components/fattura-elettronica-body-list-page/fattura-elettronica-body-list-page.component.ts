import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { FatturaElettronicaBodyDTO, FatturaElettronicaBodyResourceService } from 'aig-italianlegislation';
import { AigFatturaElettronicaNewUpdateDialogComponent } from '../fattura-elettronica-new-update-dialog/fattura-elettronica-new-update-dialog.component';
import { AigFatturaElettronicaComplexDialogComponent } from '../fattura-elettronica-complex-dialog/fattura-elettronica-complex-dialog.component';


@Component({
	selector: 'aig-fattura-elettronica-body-list-page',
    templateUrl: './fattura-elettronica-body-list-page.component.html',
    styleUrls: ['./fattura-elettronica-body-list-page.component.scss']
})
export class AigFatturaElettronicaBodyListPageComponent extends GenericComponent {
    constructor(
        private fatturaElettronicaBodyResourceService: FatturaElettronicaBodyResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initFatturaElettronicaBodySearch();

		this.showAllFatturaElettronicaBody();
	}

	reloadPage() {
		this.showAllFatturaElettronicaBody();
	}

    //			---- CITY TABLE AND SEARCH SECTION ----
    
	fatturaElettronicaBodyDTOs: FatturaElettronicaBodyDTO[];
    fatturaElettronicaBodyDC: string[];
	fatturaElettronicaBodyError: any;

    fatturaElettronicaBodySearchFormGroup: FormGroup;
	fatturaElettronicaBodyFilters: any;

	fatturaElettronicaBodyPaginationSize: number;
	fatturaElettronicaBodyLength: number;

    
    private initFatturaElettronicaBodySearch() {
		this.fatturaElettronicaBodyPaginationSize = 10;

		this.fatturaElettronicaBodySearchFormGroup = this._formBuilder.group({
			id: [''],
			numero: [''],
		});

		this.fatturaElettronicaBodyDC = ['id', 'numero', 'buttons'];
    }
    
    private clearFiltersFatturaElettronicaBody() {
		this.fatturaElettronicaBodyFilters = {
			idEquals: null,
            numeroEquals: null,
			page: 0,
		}
    }
    
    private async searchFatturaElettronicaBody(page: number) {
		this.fatturaElettronicaBodyDTOs = null;

		this.fatturaElettronicaBodyFilters.page = page;
		this.fatturaElettronicaBodyFilters.size = this.fatturaElettronicaBodyPaginationSize;

		try {
			this.fatturaElettronicaBodyLength = await this.fatturaElettronicaBodyResourceService.countFatturaElettronicaBodiesUsingGET(this.fatturaElettronicaBodyFilters).toPromise();

			if(this.fatturaElettronicaBodyLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.fatturaElettronicaBodyDTOs = [];
				return;
			}

			this.fatturaElettronicaBodyDTOs = await this.fatturaElettronicaBodyResourceService.getAllFatturaElettronicaBodiesUsingGET(this.fatturaElettronicaBodyFilters).toPromise();
		} catch (e) {
			this.fatturaElettronicaBodyError = e;
		}
    }
    
    showAllFatturaElettronicaBody() {
		this.resetFiltersFatturaElettronicaBody()
    }
    
    resetFiltersFatturaElettronicaBody() {
		this.fatturaElettronicaBodySearchFormGroup.reset();
		this.clearFiltersFatturaElettronicaBody();
		this.searchFatturaElettronicaBody(0);
    }
    
    fatturaElettronicaBodyPaginationEvent(pageEvent: PageEvent) {
		this.fatturaElettronicaBodyPaginationSize = pageEvent.pageSize;
		this.searchFatturaElettronicaBody(pageEvent.pageIndex);
	}

    fatturaElettronicaBodySearchWithFilter() {
		let searchedId = this.fatturaElettronicaBodySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.resetFiltersFatturaElettronicaBody();
			this.fatturaElettronicaBodySearchFormGroup.reset();
			this.fatturaElettronicaBodyFilters.idEquals = searchedId;
			this.searchFatturaElettronicaBody(0);
			return;
		}

		this.fatturaElettronicaBodyFilters.idEquals = null;

		this.fatturaElettronicaBodyFilters.numeroEquals = this.fatturaElettronicaBodySearchFormGroup.controls.numero.value;

		this.searchFatturaElettronicaBody(0);
	}

    newFatturaElettronicaBody(){
        this.dialog.open(AigFatturaElettronicaNewUpdateDialogComponent, { data: { fatturaElettronica: {} } });
    }
	newFatturaElettronica(){
		this.dialog.open(AigFatturaElettronicaComplexDialogComponent, { data: { fatturaElettronica: {} } });
	}
    //			---- !CITY TABLE AND SEARCH SECTION ----
}