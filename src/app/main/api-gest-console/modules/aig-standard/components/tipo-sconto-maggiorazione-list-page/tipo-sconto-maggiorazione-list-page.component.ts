import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlFeScontoMaggiorazioneTipoDTO, IlFeScontoMaggiorazioneTipoResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigTipoScontoMaggiorazioneNewUpdateDialogComponent } from '../tipo-sconto-maggiorazione-new-update-dialog/tipo-sconto-maggiorazione-new-update-dialog.component';


@Component({
	selector: 'aig-tipo-sconto-maggiorazione-list-page',
    templateUrl: './tipo-sconto-maggiorazione-list-page.component.html',
    styleUrls: ['./tipo-sconto-maggiorazione-list-page.component.scss']
})
export class AigTipoScontoMaggiorazioneListPageComponent extends GenericComponent {
    constructor(
        private tipoScontoMaggiorazioneResourceService: IlFeScontoMaggiorazioneTipoResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initTipoScontoMaggiorazioneSearch();

		this.showAllTipoScontoMaggiorazione();
	}

	reloadPage() {
		this.showAllTipoScontoMaggiorazione();
	}

    //			---- TABLE AND SEARCH SECTION ----
    
	tipoScontoMaggiorazioneDTOs: IlFeScontoMaggiorazioneTipoDTO[];
    tipoScontoMaggiorazioneDC: string[];
	tipoScontoMaggiorazioneError: any;

    tipoScontoMaggiorazioneSearchFormGroup: FormGroup;
	tipoScontoMaggiorazioneFilters: any;

	tipoScontoMaggiorazionePaginationSize: number;
	tipoScontoMaggiorazioneLength: number;

    
    private initTipoScontoMaggiorazioneSearch() {
		this.tipoScontoMaggiorazioneDC = ['code', 'name','activationDate','expirationDate','wikiCode','description', 'buttons'];
		this.tipoScontoMaggiorazionePaginationSize = 10;
		

		this.tipoScontoMaggiorazioneSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
			
		});
	}

    
    private clearFiltersTipoScontoMaggiorazione() {
		this.tipoScontoMaggiorazioneFilters = {
			idEquals: null,
			valueContains: null,
			page: 0,
		}
    }
    
    private async searchTipoScontoMaggiorazione(page: number) {
		this.tipoScontoMaggiorazioneDTOs = null;

		this.tipoScontoMaggiorazioneFilters.page = page;
		this.tipoScontoMaggiorazioneFilters.size = this.tipoScontoMaggiorazionePaginationSize;

		try {                                                                       
			this.tipoScontoMaggiorazioneLength = await this.tipoScontoMaggiorazioneResourceService.countIlFeScontoMaggiorazioneTiposUsingGET(this.tipoScontoMaggiorazioneFilters).toPromise();  
			
			if(this.tipoScontoMaggiorazioneLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tipoScontoMaggiorazioneDTOs = [];
				return;
			}

			this.tipoScontoMaggiorazioneDTOs = await this.tipoScontoMaggiorazioneResourceService.getAllIlFeScontoMaggiorazioneTiposUsingGET(this.tipoScontoMaggiorazioneFilters).toPromise();
		} catch (e) {
			this.tipoScontoMaggiorazioneError = e;
		}
	}
	
    
    showAllTipoScontoMaggiorazione() {
		this.resetFiltersTipoScontoMaggiorazione()
    }
    
    resetFiltersTipoScontoMaggiorazione() {
		this.tipoScontoMaggiorazioneSearchFormGroup.reset();
		this.clearFiltersTipoScontoMaggiorazione();
		this.searchTipoScontoMaggiorazione(0);
    }
    
    tipoScontoMaggiorazionePaginationEvent(pageEvent: PageEvent) {
		this.tipoScontoMaggiorazionePaginationSize = pageEvent.pageSize;
		this.searchTipoScontoMaggiorazione(pageEvent.pageIndex);
	}

    tipoScontoMaggiorazioneSearchWithFilter() {
		let searchedId = this.tipoScontoMaggiorazioneSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersTipoScontoMaggiorazione();
			this.tipoScontoMaggiorazioneSearchFormGroup.reset();
			this.tipoScontoMaggiorazioneFilters.idEquals = searchedId;
			this.searchTipoScontoMaggiorazione(0);
			return;
		}

		this.tipoScontoMaggiorazioneFilters.idEquals = null;

		this.tipoScontoMaggiorazioneFilters.valueContains = this.tipoScontoMaggiorazioneSearchFormGroup.controls.name.value;

		this.searchTipoScontoMaggiorazione(0);
	}

    newTipoScontoMaggiorazione(){
        this.dialog.open(AigTipoScontoMaggiorazioneNewUpdateDialogComponent, { data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise();
	}*/
    //			---- !TABLE AND SEARCH SECTION ----
}