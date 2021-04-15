import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO, TipoCassaResourceService, TipoCassaDTO, TipoScontoMaggiorazioneDTO, TipoScontoMaggiorazioneResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigTipoCassaNewUpdateDialogComponent } from '../tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigTipoScontoMaggiorazioneNewUpdateDialogComponent } from '../tipo-sconto-maggiorazione-new-update-dialog/tipo-sconto-maggiorazione-new-update-dialog.component';


@Component({
	selector: 'aig-tipo-sconto-maggiorazione-list-page',
    templateUrl: './tipo-sconto-maggiorazione-list-page.component.html',
    styleUrls: ['./tipo-sconto-maggiorazione-list-page.component.scss']
})
export class AigTipoScontoMaggiorazioneListPageComponent extends GenericComponent {
    constructor(
        private tipoScontoMaggiorazioneResourceService: TipoScontoMaggiorazioneResourceService,
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
    
	tipoScontoMaggiorazioneDTOs: TipoScontoMaggiorazioneDTO[];
    tipoScontoMaggiorazioneDC: string[];
	tipoScontoMaggiorazioneError: any;

    tipoScontoMaggiorazioneSearchFormGroup: FormGroup;
	tipoScontoMaggiorazioneFilters: any;

	tipoScontoMaggiorazionePaginationSize: number;
	tipoScontoMaggiorazioneLength: number;

    
    private initTipoScontoMaggiorazioneSearch() {
		this.tipoScontoMaggiorazionePaginationSize = 10;

		this.tipoScontoMaggiorazioneSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
		});

		this.tipoScontoMaggiorazioneDC = ['id', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersTipoScontoMaggiorazione() {
		this.tipoScontoMaggiorazioneFilters = {
			tipoScontoMaggiorazioneIDEquals: null,
			tipoScontoMaggiorazioneNameContains: null,
			page: 0,
		}
    }
    
    private async searchTipoScontoMaggiorazione(page: number) {
		this.tipoScontoMaggiorazioneDTOs = null;

		this.tipoScontoMaggiorazioneFilters.page = page;
		this.tipoScontoMaggiorazioneFilters.size = this.tipoScontoMaggiorazionePaginationSize;

		try {                                                                       
			this.tipoScontoMaggiorazioneLength = await this.tipoScontoMaggiorazioneResourceService.countTipoScontoMaggiorazionesUsingGET(this.tipoScontoMaggiorazioneFilters).toPromise();  
			
			if(this.tipoScontoMaggiorazioneLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tipoScontoMaggiorazioneDTOs = [];
				return;
			}

			this.tipoScontoMaggiorazioneDTOs = await this.tipoScontoMaggiorazioneResourceService.getAllTipoScontoMaggiorazionesUsingGET(this.tipoScontoMaggiorazioneFilters).toPromise();
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
			this.tipoScontoMaggiorazioneFilters.tipoScontoMaggiorazioneIDEquals = searchedId;
			this.searchTipoScontoMaggiorazione(0);
			return;
		}

		this.tipoScontoMaggiorazioneFilters.tipoScontoMaggiorazioneIDEquals = null;

		this.tipoScontoMaggiorazioneFilters.tipoScontoMaggiorazioneNameContains = this.tipoScontoMaggiorazioneSearchFormGroup.controls.name.value;

		this.searchTipoScontoMaggiorazione(0);
	}

    newTipoScontoMaggiorazione(){
        this.dialog.open(AigTipoScontoMaggiorazioneNewUpdateDialogComponent, { data: { tipoScontoMaggiorazione: {} } });
    }
    //			---- !TABLE AND SEARCH SECTION ----
}